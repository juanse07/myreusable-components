import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import Image from 'next/image';

interface NavBarProps<TUser> {
  brandName: string;
  logoSrc: string;
  routes: { path: string; label: string }[];
  user?: TUser;
  onLogout?: () => void;
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
  userDisplayName?: (user: TUser) => string;
  userProfilePicUrl?: (user: TUser) => string | undefined;
}

export default function NavBar<TUser>({
  brandName,
  logoSrc,
  routes,
  user,
  onLogout,
  onLoginClick,
  onSignUpClick,
  userDisplayName,
  userProfilePicUrl,
}: NavBarProps<TUser>) {
  const router = useRouter();

  return (
    <Navbar expand="md" collapseOnSelect variant="dark" bg="body" sticky="top">
      <Navbar.Brand as={Link} href="/" className="d-flex align-items-center gap-1">
        <Image src={logoSrc} alt={brandName} width={30} height={30} />
        <span>{brandName}</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        <Nav>
          {routes.map((route) => (
            <Nav.Link
              key={route.path}
              as={Link}
              href={route.path}
              active={router.pathname === route.path}
            >
              {route.label}
            </Nav.Link>
          ))}
        </Nav>
        {user ? (
          <LoggedInView
            user={user}
            onLogout={onLogout}
            userDisplayName={userDisplayName}
            userProfilePicUrl={userProfilePicUrl}
          />
        ) : (
          <LoggedOutView onLoginClick={onLoginClick} onSignUpClick={onSignUpClick} />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

interface LoggedInViewProps<TUser> {
  user: TUser;
  onLogout?: () => void;
  userDisplayName?: (user: TUser) => string;
  userProfilePicUrl?: (user: TUser) => string | undefined;
}

function LoggedInView<TUser>({
  user,
  onLogout,
  userDisplayName,
  userProfilePicUrl,
}: LoggedInViewProps<TUser>) {
  const displayName = userDisplayName ? userDisplayName(user) : 'User';
  const profilePicUrl = userProfilePicUrl ? userProfilePicUrl(user) : '/profile-pic-placeholder.png';

  return (
    <Nav className="ms-auto me-5">
      <Nav.Link as={Link} href="/book-service" className="link-primary d-flex align-items-center gap-1 me-3">
        <FiEdit />
        Book a Service
      </Nav.Link>
      <Navbar.Text className="d-flex align-items-center gap-2">
        Hey, {displayName}!
      </Navbar.Text>
      <NavDropdown
        className="d-flex align-items-center gap-2"
        title={
          <Image
            src={profilePicUrl || '/profile-pic-placeholder.png'}
            alt={displayName}
            width={40}
            height={40}
            className="rounded-circle"
          />
        }
      >
        <NavDropdown.Item as={Link} href="/profile">
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} href="/orders">
          Orders
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} href="/settings">
          Settings
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onLogout}>Log Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

interface LoggedOutViewProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

function LoggedOutView({ onLoginClick, onSignUpClick }: LoggedOutViewProps) {
  return (
    <Nav className="ms-auto">
      <div className="d-flex justify-content-center justify-content-md-start">
        <Button variant="outline-primary" className="ms-md-2 mt-2 mt-md-0 ms-3" onClick={onLoginClick}>
          Log In
        </Button>
        <Button className="ms-md-2 mt-2 mt-md-0 ms-3 me-3" onClick={onSignUpClick}>
          Sign Up
        </Button>
      </div>
    </Nav>
  );
}

