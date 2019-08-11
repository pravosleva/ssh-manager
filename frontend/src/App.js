/* eslint-disable eqeqeq */
import React from 'react';
import {
  // Container,
  Checkbox,
  Header,
  Segment,
  Sidebar,
  Button, Card, // Image,
  // Input,
  Divider,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  addConnection,
  updateConnection,
  removeConnection,
} from './actions';
import VerticalSidebar from './components/Sidebar/Vertical';
import Terminal from './lib/Terminal';
import { getPartialBySize } from './lib/arrays';
import withLocalStorageManager from './hocs/withLocalStorageManager';

class App extends React.Component {
  state = {
    activeItem: 'terminal',
    menuVisible: false
  }

  menuToggle = (e, { checked }) => this.setState({ menuVisible: checked })

  getSpecialConnectionsObjectFromStore = () => {
    if (!this.props.connections) {
      return null;
    }
    if (!Object.keys(this.props.connections).length) {
      return null;
    }

    const connections = { ...this.props.connections };
    const result = [];

    Object.keys(connections).map(k => {
      result.push({
        user: connections[k].info.user,
        host: connections[k].info.host,
        id: connections[k].info.id,
        comand: connections[k].comand,
        description: connections[k].info.description,
      });

      return false;
    })

    return result;
  }

  setConnectionFromLSToStore = () => {
    const connectionsFromLS = this.props.getLSItem('connections');

    if (!connectionsFromLS) {
      return null;
    }

    for (let i = 0; i < connectionsFromLS.length; i++) {
      this.props.dispatch(addConnection({
        id: connectionsFromLS[i].id,
        stuff: {
          info: {
            user: connectionsFromLS[i].user,
            host: connectionsFromLS[i].host,
            id: connectionsFromLS[i].id,
            description: connectionsFromLS[i].description
          },
          out: '',
          comand: connectionsFromLS[i].comand,
          pass: '',
          terminal: null,
        },
      }));
    }
  }

  render() {
    const { activeItem, menuVisible } = this.state;
    const { connections } = this.props;

    return (
      <Sidebar.Pushable /* as={Segment} */ style={{ minHeight: '100vh' }}>
        <VerticalSidebar

          animation='push'
          direction='left'
          visible={menuVisible}
          activeItem={activeItem}
          onItemChange={item => this.setState({ activeItem: item })}
          createNewTerminal={({
            description,
            comand,
            host,
            user,
            pass,
            id
          }) => {
            const _this = this;

            this.props.dispatch(addConnection({
              id,
              stuff: {
                info: { user, host, id, description },
                out: '',
                comand,
                pass,
                terminal: new Terminal({
                  host,
                  user,
                  pass,
                  cbOut: out => _this.props.dispatch(updateConnection({ id, fieldName: 'out', newValue: out })),
                  cbExe: out => _this.props.dispatch(updateConnection({ id, fieldName: 'out', newValue: out })),
                  cbExit: code => {},
                  cbError: stderr => _this.props.dispatch(updateConnection({ id, fieldName: 'out', newValue: stderr })),
                }),
              },
            }));
          }}
        />
        <Sidebar.Pusher /* dimmed={menuVisible} */>
          <Segment basic size='huge'>
            <Header as='h3'><Checkbox checked={menuVisible} label='Menu' onChange={this.menuToggle} toggle /></Header>
            {/*
            <Button
              basic
              color='grey'
              onClick={() => this.props.getLSItem('connections')}
            >
              Get connections from LS
            </Button>
            */}
            <Button
              basic
              color='grey'
              onClick={() => {
                const cs = this.getSpecialConnectionsObjectFromStore();

                if (cs) this.props.setLSItem('connections', cs);
              }}
            >
              Save connections from store to LS
            </Button>
            <Button
              basic
              color='grey'
              onClick={() => this.props.clearLS()}
            >
              Clear LS
            </Button>
            <Button
              basic
              color='blue'
              onClick={() => this.setConnectionFromLSToStore()}
            >
              Set to Store from LS
            </Button>
            <Divider />
            {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
            {
              connections && Object.keys(connections).length
              ? (
                <>
                  {
                    getPartialBySize(Object.keys(connections), 1).map((chunk, i) => (
                      <Card.Group key={`${JSON.stringify(chunk)}--${i}`} itemsPerRow={chunk.length}>
                        {
                          Object.values(chunk).map(id => (
                            connections[id]
                            ? (
                              <Card
                                key={connections[id].info.id}
                                // fluid
                              >
                                <Card.Content>
                                  {/* <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' /> */}
                                  <Card.Header>{connections[id].info.user}@{connections[id].info.host}</Card.Header>
                                  <Card.Meta>{connections[id].info.description}</Card.Meta>
                                </Card.Content>
                                <Card.Content>
                                  <div /* className='ui two buttons' */>
                                    <Button
                                      basic
                                      color='blue'
                                      onClick={() => connections[id].terminal.run(connections[id].comand)}
                                      disabled={!connections[id].comand.length || !connections[id].pass || !connections[id].terminal}
                                    >
                                      Run
                                    </Button>
                                    <Button
                                      basic
                                      color='red'
                                      onClick={() => this.props.dispatch(removeConnection(id))}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </Card.Content>
                                <Card.Content>
                                  <Form>
                                    <Form.Group widths='equal'>
                                      {
                                        !connections[id].terminal
                                        ? (
                                          <Form.Input
                                            required
                                            fluid
                                            type='password'
                                            label='Pass'
                                            placeholder='Password'
                                            value={connections[id].pass}
                                            onChange={ev => this.props.dispatch(updateConnection({ id, fieldName: 'pass', newValue: ev.target.value }))}
                                            onKeyUp={ev => {
                                              const _this = this;

                                              if (ev.keyCode == 13) {
                                                this.props.dispatch(updateConnection({
                                                  id,
                                                  fieldName: 'terminal',
                                                  newValue: new Terminal({
                                                    host: connections[id].info.host,
                                                    user: connections[id].info.user,
                                                    pass: connections[id].pass,
                                                    cbOut: out => _this.props.dispatch(updateConnection({ id, fieldName: 'out', newValue: out })),
                                                    cbExe: out => _this.props.dispatch(updateConnection({ id, fieldName: 'out', newValue: out })),
                                                    cbExit: code => {},
                                                    cbError: stderr => _this.props.dispatch(updateConnection({ id, fieldName: 'out', newValue: stderr })),
                                                  }),
                                                }));
                                              };
                                            }}
                                          />
                                        ) : null
                                      }
                                      <Form.Input
                                        required
                                        fluid
                                        label='Comand'
                                        placeholder='Comand'
                                        value={connections[id].comand}
                                        onChange={e => {
                                          this.props.dispatch(updateConnection({ id, fieldName: 'comand', newValue: e.target.value }));
                                        }}
                                        onKeyUp={ev => {
                                          if (ev.keyCode == 13) {
                                            connections[id].terminal.run(connections[id].comand)
                                          };
                                        }}
                                        disabled={!connections[id].comand.length || !connections[id].pass || !connections[id].terminal}
                                      />
                                    </Form.Group>
                                  </Form>
                                  {
                                    connections[id].out
                                    ? (
                                      <>
                                        <Divider horizontal>Out</Divider>
                                        <Card.Description>
                                          <pre>{String(connections[id].out)}</pre>
                                        </Card.Description>
                                      </>
                                    ) : null
                                  }
                                </Card.Content>
                              </Card>
                            ) : <em>No connections[id] for {id} | connections is {JSON.stringify(connections)}</em>
                          ))
                        }
                      </Card.Group>
                    ))
                  }
                </>
              ) : null
            }
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
};
App.propTypes = {
  connections: PropTypes.shape({}),
  // HOC
  getLSItem: PropTypes.func,
  setLSItem: PropTypes.func,
  removeLSItem: PropTypes.func,
  clearLS: PropTypes.func,
};
App.defaultProps = {
  connections: {},
  getLSItem: () => null,
  setLSItem: (name, value) => console.log('Could not be done.'),
  removeLSItem: (name, value) => console.log('Could not be done.'),
  clearLS: () => console.log('Could not be done.'),
};

const mapState = ({ connections }) => ({
  connections,
});

export default withLocalStorageManager(connect(mapState)(App));
