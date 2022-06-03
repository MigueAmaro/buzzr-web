import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Login from "../component/Login.jsx";
import Register from "../component/Register.jsx";
import { Helmet } from "react-helmet";

export const Home = () => {
  const { store } = useContext(Context);
  return (
    <>
      {store.token == "" ? (
        <div>
          <Helmet>
            <style>{"body {background-color: white;}"}</style>
          </Helmet>
          <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-5 p-lg-5 mx-auto my-5">
              <h1 className="display-4 font-weight-normal">BuzzrApp</h1>
              <p className="lead font-weight-normal">
                Buzzr is project management tool and a Messaging App all in one.
                Chat, keep things organized, assign and automate tasks.
              </p>
              <Login />
              <Register />
            </div>
            <div className="product-device box-shadow d-none d-md-block">
              <p className="dialog-02">Are you on Buzzr?</p>
              <br className="mt-1"></br>
              <p className="dialog-03">Hey Buzzrs!</p>
              <br className="mt-1"></br>
              <p className="dialog-02">BuzzrApp is so fast!</p>
            </div>
            <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
          </div>
          <div className="container marketing">
            <hr className="featurette-divider" />

            <div className="row featurette">
              <div className="col-md-7">
                <h2 className="featurette-heading fw-normal lh-1">
                  Buzzr is the ultimate
                  <span className="text-muted"> Workspace</span>
                </h2>
                <p className="lead">
                  Buzzr is an instant messaging platform that not only allows
                  you to have direct communication with the members of your work
                  team, but also makes it easy to assign tasks and keep track of
                  them. What characterizes Buzzr is the "Buzz" method, a method
                  in which team leaders can send the message to other Buzzr
                  users through an email created from the same app. In this way,
                  team leaders can highlight the most relevant information and
                  ensure that it doesn't get lost in a sea of messages. Once the
                  team leader has sent the Buzz, the recipient will receive a
                  Pop-Up via Buzzr as a reminder that there is a pending
                  conversation or task.
                </p>
              </div>
              <div className="col-md-5">
                <svg
                  className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                  width="500"
                  height="500"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: 500x500"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#eee"></rect>
                  <text x="50%" y="50%" fill="#aaa" dy=".3em">
                    500x500
                  </text>
                </svg>
              </div>
            </div>

            <hr className="featurette-divider" />

            <div className="row featurette">
              <div className="col-md-7 order-md-2">
                <h2 className="featurette-heading fw-normal lh-1">
                  Buzzr <span className="text-muted">See it for yourself.</span>
                </h2>
                <p className="lead">
                  Lorem ipsum dolor sit amet, consectetur adip sed do eiusmod
                  tempor incididunt ut labore et dol lorem ipsum dolor. Lorem
                  ipsum dolor Lorem lorem ipsum Lorem ipsum dolor sit amet,
                  consectetur adip sed do eiusmod tempor incididunt ut labore et
                  dol lorem ipsum dolor. Lorem ipsum dolor Lorem lorem ipsum.
                </p>
              </div>
              <div className="col-md-5 order-md-1">
                <svg
                  className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                  width="500"
                  height="500"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: 500x500"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#eee"></rect>
                  <text x="50%" y="50%" fill="#aaa" dy=".3em">
                    500x500
                  </text>
                </svg>
              </div>
            </div>

            <hr className="featurette-divider" />
          </div>

          {/* <div className="container mt-5">
            <h1>Get started with Bootstrap</h1>
            <p className="fs-5 col-md-8">
              Quickly and easily get started with Bootstrap's compiled,
              production-ready files with this barebones example featuring some
              basic HTML and helpful links. Download all our examples to get
              started.
            </p>

            <div className="mb-5">
              <a href="/" className="btn btn-primary btn-lg px-4">
                Download examples
              </a>
            </div>
          </div> */}
        </div>
      ) : (
        <div>
          {/* <Chat /> */}
          {/* <PrivateChat /> */}
          <ul>
            <li>Channels</li>
            {store.channels.map((channel) => {
              return (
                <li key={channel.id}>
                  <Link to={`/channelchat/${channel.name}`}>
                    {channel.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
