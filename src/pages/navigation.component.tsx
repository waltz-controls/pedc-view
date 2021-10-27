import {NavLink} from "react-router-dom";
import {Alignment, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import React from "react";
import './navigation.component.scss';
import {useAppState} from "../state/state.context";
import {USER_ROLE} from '../types';

type NavigationComponentProps = {
  links: Array<{
    to: string;
    title: string;
    role: USER_ROLE;
  }>
};

export default function NavigationComponent(props: NavigationComponentProps) {
  const appState = useAppState();
  const currentRole = appState.getUserRole();

  const links = props.links.filter((link) => link.role === currentRole);

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <NavLink to={'/'}>
            <strong>PEDC-VIEW</strong>
          </NavLink>
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        {links.map((link: any, index: number) => (
          <NavLink
            key={index}
            to={link.to}
            className='nav-link'
            activeClassName='nav-link--active'
          >{link.title}
          </NavLink>
        ))}
        <NavbarDivider/>

        <NavLink
          to="/login"
          onClick={() => appState.clearAll()}
        >
          Log out
        </NavLink>
      </NavbarGroup>
    </Navbar>
  );
}
