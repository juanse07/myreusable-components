import Image from 'next/image';
import Link from 'next/link';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface UserProfileLinkProps<TUser> {
  user: TUser;
  getUserName: (user: TUser) => string;
  getProfilePicUrl: (user: TUser) => string | undefined;
  getJoinedDate: (user: TUser) => Date;
  getAbout?: (user: TUser) => string | undefined;
}

export default function UserProfileLink<TUser>({
  user,
  getUserName,
  getProfilePicUrl,
  getJoinedDate,
  getAbout,
}: UserProfileLinkProps<TUser>) {
  return (
    <OverlayTrigger
      overlay={
        <Tooltip className="position-absolute">
          <UserTooltipContent
            user={user}
            getUserName={getUserName}
            getProfilePicUrl={getProfilePicUrl}
            getJoinedDate={getJoinedDate}
            getAbout={getAbout}
          />
        </Tooltip>
      }
      delay={{ show: 500, hide: 0 }}
    >
      <span className="d-flex align-items-center w-fit-content">
        <Image
          src={getProfilePicUrl(user) || '/profile-pic-placeholder.png'} // Use a placeholder path or provide one
          alt={"Profile picture of " + getUserName(user)}
          width={40}
          height={40}
          className="rounded-circle mb-1"
        />
        <Link href={`/users/${getUserName(user)}`} className="ms-2">
          {getUserName(user)}
        </Link>
      </span>
    </OverlayTrigger>
  );
}

interface UserTooltipContentProps<TUser> extends UserProfileLinkProps<TUser> {}

function UserTooltipContent<TUser>({
  user,
  getUserName,
  getProfilePicUrl,
  getJoinedDate,
  getAbout,
}: UserTooltipContentProps<TUser>) {
  return (
    <div className="p-2">
      <Image
        src={getProfilePicUrl(user) || '/profile-pic-placeholder.png'} // Use a placeholder path or provide one
        alt={"Profile picture of " + getUserName(user)}
        width={150}
        height={150}
        className="rounded-circle"
      />
      <div className="text-start">
        <strong>Username:</strong> {getUserName(user)} <br />
        <strong>Joined on:</strong> {getJoinedDate(user).toLocaleDateString()} <br />
        {getAbout && getAbout(user) && (
          <>
            <strong>About:</strong> {getAbout(user)} <br />
          </>
        )}
      </div>
    </div>
  );
}