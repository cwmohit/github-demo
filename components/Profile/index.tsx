import Link from "next/link";
import React from "react";

function Profile({
  name,
  bio,
  location,
  blog,
  avatar,
  github,
}: {
  name: string;
  bio: string;
  location: string;
  blog: string;
  avatar: string;
  github: string;
}) {
  return (
    <div className="container">
      <div className="user_profile row justify-content-center">
        <div className="profile col-md-4 col-12">
          <div className="profile_image">
            <img src={avatar} alt="avatar" />
          </div>
          {github && (
            <Link href={github} passHref={true}>
              <div className="d-flex">
                <svg
                  aria-hidden="true"
                  height="16"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  data-view-component="true"
                  className="octicon octicon-book UnderlineNav-octicon hide-sm"
                >
                  <path
                    fillRule="evenodd"
                    d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z"
                  ></path>
                </svg>
                <a>{github}</a>
              </div>
            </Link>
          )}
        </div>
        <div className="profile_info col-md-8 col-12">
          <h1>{name}</h1>
          <p>{bio}</p>
          <p>{location}</p>
          <p>{blog}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
