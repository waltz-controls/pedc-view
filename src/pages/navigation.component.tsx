import {NavLink, useHistory} from "react-router-dom";
import {Alignment, Button, Menu, MenuItem, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import React from "react";
import './navigation.component.scss';
import {Popover2} from "@blueprintjs/popover2";
import {useAppState} from "../state/state.context";

type NavigationComponentProps = {
  links: Array<{
    to: string;
    title: string;
  }>
};

export default function NavigationComponent(props: NavigationComponentProps) {

  const appState = useAppState();
  const history = useHistory();

  const NavigationMenu = (
    <Menu>
      <MenuItem
        icon="log-out"
        text="Log out"
        onClick={() => {
          appState.setToken('');
          history.push('/login');
        }}
      />
    </Menu>
  );

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <NavLink to={'/'}>
            <strong>PEDC-WI</strong>
          </NavLink>
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        {props.links.map((link: any, index: any) => (
          <NavLink
            key={index}
            to={link.to}
            className='nav-link'
            activeClassName='nav-link--active'
          >{link.title}
          </NavLink>
        ))}
        <NavbarDivider/>

        <Popover2 content={NavigationMenu}>
          <Button icon="user" minimal/>
        </Popover2>

      </NavbarGroup>
    </Navbar>
  );
}
