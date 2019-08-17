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
  addWindow,
  updateWindow,
  updateOut,
  removeWindow,
} from './actions';
import VerticalSidebar from './components/Sidebar/Vertical';
import Terminal from './lib/Terminal';
import { getPartialBySize } from './lib/arrays';
import withLocalStorageManager from './hocs/withLocalStorageManager';
import withRefs from './hocs/withRefs';
import OutputSpace from './components/Console/OutputSpace';

class App extends React.Component {
  state = {
    activeItem: 'terminal',
    menuVisible: false
  }

  menuToggle = (e, { checked }) => this.setState({ menuVisible: checked })

  getSpecialConnectionsObjectFromStore = () => {
    if (!this.props.windows) {
      return null;
    }
    if (!Object.keys(this.props.windows).length) {
      return null;
    }

    const windows = { ...this.props.windows };
    const result = [];

    Object.keys(windows).map(k => {
      result.push({
        user: windows[k].info.user,
        host: windows[k].info.host,
        id: windows[k].info.id,
        comand: windows[k].comand,
        description: windows[k].info.description,
      });

      return false;
    })

    return result;
  }

  setConnectionFromLSToStore = () => {
    const connectionsFromLS = this.props.getLSItem('windows');

    if (!connectionsFromLS) {
      return null;
    }

    for (let i = 0; i < connectionsFromLS.length; i++) {
      this.props.dispatch(addWindow({
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
    const {
      windows,
      // withRefs
      scrollDownByID,
      addRef,
      removeRef,
      ...props
    } = this.props;

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

            addRef(id);
            this.props.dispatch(addWindow({
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
                  cbOut: out => {
                    // _this.props.dispatch(updateWindow({ id, fieldName: 'out', newValue: out }));
                    _this.props.dispatch(updateOut({ id, out }));
                    _this.props.scrollDownByID(id);
                  },
                  cbExe: out => {
                    _this.props.dispatch(updateWindow({ id, fieldName: 'out', newValue: out }))
                  },
                  cbExit: code => {},
                  cbError: stderr => {
                    _this.props.dispatch(updateWindow({ id, fieldName: 'out', newValue: stderr }));
                    _this.props.scrollDownByID(id);
                  },
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
              onClick={() => this.props.getLSItem('windows')}
            >
              Get windows from LS
            </Button>
            */}
            <Button
              basic
              color='grey'
              onClick={() => {
                const cs = this.getSpecialConnectionsObjectFromStore();

                if (cs) this.props.setLSItem('windows', cs);
              }}
            >
              Save windows from store to LS
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
              windows && Object.keys(windows).length
              ? (
                <>
                  {
                    getPartialBySize(Object.keys(windows), 1).map((chunk, i) => (
                      <Card.Group key={`${JSON.stringify(chunk)}--${i}`} itemsPerRow={chunk.length}>
                        {
                          Object.values(chunk).map(id => (
                            windows[id]
                            ? (
                              <Card
                                key={windows[id].info.id}
                                // fluid
                                style={{ position: 'relative' }}
                              >
                                <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                                  <Button
                                    basic
                                    color='red'
                                    onClick={() => {
                                      this.props.dispatch(removeWindow(id));
                                      removeRef(id);
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                                <Card.Content>
                                  {/* <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' /> */}
                                  <Card.Header>{windows[id].info.user}@{windows[id].info.host}</Card.Header>
                                  <Card.Meta>{windows[id].info.description}</Card.Meta>
                                </Card.Content>
                                {/*
                                <Card.Content>
                                  <div>
                                    <Button
                                      basic
                                      color='blue'
                                      onClick={() => windows[id].terminal.run(windows[id].comand)}
                                      disabled={!windows[id].comand.length || !windows[id].pass || !windows[id].terminal}
                                    >
                                      Run
                                    </Button>
                                  </div>
                                </Card.Content>
                                */}
                                <Card.Content>
                                  <Form>
                                    <Form.Group widths='equal'>
                                      {
                                        !windows[id].terminal
                                        ? (
                                          <Form.Input
                                            required
                                            fluid
                                            type='password'
                                            label='Pass'
                                            placeholder='Password'
                                            value={windows[id].pass}
                                            onChange={ev => this.props.dispatch(updateWindow({ id, fieldName: 'pass', newValue: ev.target.value }))}
                                            onKeyUp={ev => {
                                              const _this = this;

                                              if (ev.keyCode == 13) {
                                                addRef(id);
                                                this.props.dispatch(updateWindow({
                                                  id,
                                                  fieldName: 'terminal',
                                                  newValue: new Terminal({
                                                    host: windows[id].info.host,
                                                    user: windows[id].info.user,
                                                    pass: windows[id].pass,
                                                    // cbOut: out => _this.props.dispatch(updateWindow({ id, fieldName: 'out', newValue: out })),
                                                    cbOut: out => {
                                                      _this.props.dispatch(updateOut({ id, out }));
                                                      _this.props.scrollDownByID(id);
                                                    },
                                                    cbExe: out => _this.props.dispatch(updateWindow({ id, fieldName: 'out', newValue: out })),
                                                    cbExit: code => {},
                                                    cbError: stderr => {
                                                      _this.props.dispatch(updateWindow({ id, fieldName: 'out', newValue: stderr }));
                                                      _this.props.scrollDownByID(id);
                                                    },
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
                                        value={windows[id].comand}
                                        onChange={e => {
                                          this.props.dispatch(updateWindow({ id, fieldName: 'comand', newValue: e.target.value }));
                                        }}
                                        onKeyUp={ev => {
                                          const couldBeRunned = windows[id].terminal && (windows[id].comand.length > 0 || windows[id].pass || windows[id].terminal);

                                          if (ev.keyCode == 13) {
                                            if (couldBeRunned) {
                                              windows[id].terminal.run(windows[id].comand);
                                            } else {
                                              console.warn('Could not be runned.');
                                            }
                                            return;
                                          }
                                        }}
                                        // disabled={!windows[id].comand.length || !windows[id].pass || !windows[id].terminal}
                                      />
                                    </Form.Group>
                                  </Form>
                                  {/*
                                    windows[id].out
                                    ? (
                                      <>
                                        <Divider horizontal>Out</Divider>
                                        <Card.Description>
                                          <pre><small>{String(windows[id].out)}</small></pre>
                                        </Card.Description>
                                      </>
                                    ) : null
                                  */}
                                  {
                                    windows[id].out
                                    ? (
                                      <OutputSpace>
                                        <pre ref={props[id]}><small>{String(windows[id].out)}</small></pre>
                                      </OutputSpace>
                                    ) : null
                                  }
                                </Card.Content>
                              </Card>
                            ) : <em>No windows[id] for {id} | windows is {JSON.stringify(windows)}</em>
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
  windows: PropTypes.shape({}),
  // HOC
  getLSItem: PropTypes.func,
  setLSItem: PropTypes.func,
  removeLSItem: PropTypes.func,
  clearLS: PropTypes.func,
};
App.defaultProps = {
  windows: {},
  getLSItem: () => null,
  setLSItem: (name, value) => console.log('Could not be done.'),
  removeLSItem: (name, value) => console.log('Could not be done.'),
  clearLS: () => console.log('Could not be done.'),
};

const mapState = ({ windows }) => ({
  windows,
});

export default withRefs(withLocalStorageManager(connect(mapState)(App)));
