import React from 'react';
import { Navbar } from './Navbar';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => (
  <div className="layout">
    <Navbar />
    <main className="main-content">{children}</main>
  </div>
);
