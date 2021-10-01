import {NavLink} from "react-router-dom";
import {Alignment, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import React from "react";
import './navigation.component.scss';
import {useAppState} from "../state/state.context";

type NavigationComponentProps = {
  links: Array<{
    to: string;
    title: string;
  }>
};

export default function NavigationComponent(props: NavigationComponentProps) {
  const appState = useAppState();

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

        <NavLink
          to="/login"
          onClick={() => appState.clearToken()}
        >
          Log out
        </NavLink>
      </NavbarGroup>
    </Navbar>
  );
}
