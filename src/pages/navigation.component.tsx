import {NavLink} from "react-router-dom";
import {Alignment, Button, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import React from "react";
import './navigation.component.scss';

type NavigationComponentProps = {
  links: Array<{
    to: string;
    title: string;
  }>
};

export default function NavigationComponent(props: NavigationComponentProps) {

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
        <Button icon="user" minimal/>
        <Button icon="notifications" minimal/>
        <Button icon="cog" minimal/>
      </NavbarGroup>
    </Navbar>
  );
}
