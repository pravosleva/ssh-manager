import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Icon,
  Sidebar,
  Button, Header, Modal,
  Input, Form
} from 'semantic-ui-react';

const initialState = {
  description: '',
  host: '',
  user: '',
  pass: '',
  comand: '',
};

class VerticalSidebar extends React.Component {
  state = {
    modalOpen: false,
    ...initialState,
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  getID = () => Math.random()

  render () {
    const {
      animation,
      direction,
      visible,
      activeItem,
      onItemChange,
      createNewTerminal,
    } = this.props;

    return (
      <Sidebar
        as={Menu}
        animation={animation}
        direction={direction}
        icon='labeled'
        inverted
        vertical
        visible={visible}
        width='thin'
      >
        <Menu.Item
          as='a'
          active={activeItem === 'terminal'}
          onClick={(e) => {
            e.preventDefault();
            onItemChange('terminal');
          }}
        >
          <Icon name='terminal' />
          Terminal
        </Menu.Item>
        <Modal
          trigger={
            <Menu.Item
              as='a'
              // active={activeItem === 'camera'}
              onClick={(e) => {
                e.preventDefault();
                this.handleOpen(e);
              }}
            >
              <Icon name='plus' />
              New
            </Menu.Item>
          }
          open={this.state.modalOpen}
          onClose={this.handleClose}
          // basic
          size='small'
        >
          <Header icon='terminal' content='Create New Terminal' />
          {/*
          <Modal.Content>
            <h3>You have to enter user@host.</h3>
          </Modal.Content>
          */}
          <Modal.Content>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  required
                  fluid
                  label='User'
                  placeholder='User'
                  value={this.state.user}
                  onChange={(e) => {
                    this.setState({ user: e.target.value });
                  }}
                />
                <Form.Input
                  required
                  fluid
                  label='Host'
                  placeholder='127.0.0.1'
                  value={this.state.host}
                  onChange={(e) => {
                    this.setState({ host: e.target.value });
                  }}
                />
                <Form.Input
                  required
                  fluid
                  label='Pass'
                  placeholder='Pass'
                  value={this.state.pass}
                  onChange={(e) => {
                    this.setState({ pass: e.target.value });
                  }}
                  type='password'
                />
              </Form.Group>
              <Form.Field>
                <label>Description</label>
                <Input
                  placeholder='Coment about this terminal'
                  fluid
                  value={this.state.description}
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                  }}
                />
              </Form.Field>
              <Form.Field required>
                <label>Comand</label>
                <Input
                  label='$'
                  placeholder='Comand'
                  fluid
                  value={this.state.comand}
                  onChange={(e) => {
                    this.setState({ comand: e.target.value });
                  }}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color='grey'
              onClick={() => {
                this.setState({ ...initialState });
              }}
              // inverted
              disabled={!this.state.user && !this.state.host && !this.state.pass && !this.state.comand}
            >
              <Icon name='remove' /> Clear
            </Button>
            <Button
              disabled={!this.state.user || !this.state.host || !this.state.pass || !this.state.comand}
              color='green'
              onClick={() => {
                this.handleClose();
                createNewTerminal({
                  description: this.state.description,
                  user: this.state.user,
                  host: this.state.host,
                  pass: this.state.pass,
                  comand: this.state.comand,
                  id: this.getID(),
                });
              }}
              // inverted
            >
              <Icon name='checkmark' /> Got it
            </Button>
            <Button
              color='red'
              onClick={() => {
                this.handleClose();
              }}
              // inverted
            >
              <Icon name='remove' /> No
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}
VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
  activeItem: PropTypes.string,
  onItemChange: PropTypes.func,
  createNewTerminal: PropTypes.func,
}

export default VerticalSidebar;
