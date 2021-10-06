import React, { useState, useCallback, useEffect } from "react";
import { Switch, Router, Route } from "react-router-dom";

import history from "./history";
import SplashScreenContainer from "./containers/SplashScreen/SplashScreenContainer";
import LoginScreenContainer from "./containers/LoginScreen/LoginScreenContainer";
import SignUpScreenContainer from "./containers/SignUpScreen/SignUpScreenContainer";
import EmailSignupContainer from "./containers/EmailSignupContainer/EmailSignupContainer";
import EmailSignInContainer from "./containers/EmailSignIn/EmailSignInContainer";
import EmailResetPasswordContainer from "./containers/EmailResetPassword/EmailResetPasswordContainer";
import PhoneSignupContainer from "./containers/PhoneSignup/PhoneSignupContainer";
import PhoneSigninContainer from "./containers/PhoneSignin/PhoneSigninContainer";
import VerifySigninContainer from "./containers/VerifySignin/VerifySigninContainer";
import VerifyPhoneContainer from "./containers/VerifyPhone/VerifyPhoneContainer";
import NewPasswordContainer from "./containers/NewPassword/NewPasswordContainer";

import Footer from "./components/Footer";
import { getTokenDetails } from "./state/actions/userActions";
import MenuComponent from "./components/Menu";
import Leaderboard1 from "./containers/Leaderboard1/LeaderboardContainer";
import Onboarding1 from "./containers/Onboarding1/OnboardingContainer";
import WelcomeContainer from "./containers/Welcome/WelcomeContainer";
import ProfileSettingsContainer from "./containers/ProfileSettings/ProfileSettingsContainer";
import HomeContainer from "./containers/Home/HomeContainer";
import ResultContainer from "./containers/Result/ResultContainer";
import UpgradeToPro from "./containers/UpgradeToPro/UpgradeToProContainer";
import LeaderboardHomeContainer from "./containers/LeaderoardHome/LeaderoardHomeContainner";
import UploadContainer from "./containers/Upload/UploadContainer";
import PlayContainer from "./containers/Play/PlayContainer";
import DiscoverMusic from "./containers/DiscoverMusic/DiscoverMusic";
import ProfileContainerNew from "./containers/ProfileContainerNew/ProfileContainerNew";
import AccessCode from "./containers/AccessCode";
import OnBoardingStepTwo from "./containers/OnBoardingStepTwo";
import SuccessComponent from './components/SuccessComponent/SuccessComponent';
import UnSuccessComponent from './components/UnSuccessComponent/UnSuccessComponent';
import UpgradeSucessComponent from './components/UpgradeSucessComponent/UpgradeSucessComponent';

export const MenuHandlerContext = React.createContext();

export default (props) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenuClick = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  // useEffect(() => {
  //   const isAccessTokenEntered = localStorage.getItem("access-token-entered");
  //   if (!isAccessTokenEntered) {
  //     history.push("/access-code");
  //   }
  // }, []);

  return (
    <Router history={history}>
      {showMenu && (
        <MenuComponent handleClickMenuToggle={handleToggleMenuClick} />
      )}
      <MenuHandlerContext.Provider value={handleToggleMenuClick}>
        <Switch>
          <Route path="/" component={DiscoverMusic} exact />
          {/* <Route path="/access-code" component={AccessCode} exact /> */}
          <Route path="/splash" component={SplashScreenContainer} exact />
          <Route path="/loginScreen" component={LoginScreenContainer} exact />
          <Route path="/signupScreen" component={SignUpScreenContainer} exact />
          <Route path="/emailSignup" component={EmailSignupContainer} exact />
          <Route path="/emailSignIn" component={EmailSignInContainer} exact />
          <Route
            path="/emailReset"
            component={EmailResetPasswordContainer}
            exact
          />
          <Route
            path="/changePassword"
            component={NewPasswordContainer}
            exact
          />
          <Route path="/phoneSignup" component={PhoneSignupContainer} exact />
          <Route path="/phoneSignin" component={PhoneSigninContainer} exact />
          <Route path="/verifySignup" component={VerifyPhoneContainer} exact />
          <Route path="/verifySignin" component={VerifySigninContainer} exact />
          <Route path="/reset" component={NewPasswordContainer} exact />
          <Route path="/success" component={withValidToken(SuccessComponent)} exact />
          <Route path="/decline" component={withValidToken(UnSuccessComponent)} exact />
          <Route path="/upgraded" component={withValidToken(UpgradeSucessComponent)} exact />
          <Route
            path="/onboarding"
            component={withValidToken(Onboarding1)}
            exact
          />
          <Route
            path="/leaderboard"
            component={withValidToken(Leaderboard1)}
            exact
          />
          <Route
            path="/onboarding-complete"
            component={withValidToken(OnBoardingStepTwo)}
            exact
          />
          <Route
            path="/upload"
            component={withValidToken(UploadContainer)}
            exact
          />
          <Route
            path="/upgrade"
            component={withValidToken(UpgradeToPro)}
            exact
          />
          <Route path="/play" component={withValidToken(PlayContainer)} exact />
          <Route
            path="/welcome"
            component={withValidToken(WelcomeContainer)}
            exact
          />
          <Route
            path="/profile/:username"
            component={withValidToken(ProfileContainerNew)}
            exact
          />
          <Route
            path="/profile-settings"
            component={withValidToken(ProfileSettingsContainer)}
            exact
          />
          <Route path="/home" exact component={withValidToken(HomeContainer)} />
          <Route
            path="/leaderboard-home"
            component={withValidToken(LeaderboardHomeContainer)}
            exact
          />
          <Route
            path="/result"
            component={withValidToken(ResultContainer)}
            exact
          />
        </Switch>
      </MenuHandlerContext.Provider>
      <Footer />
    </Router>
  );
};

const withValidToken = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      window.scrollTo(0, 0);
      // const isAccessTokenEntered = localStorage.getItem("access-token-entered");
      // if (!isAccessTokenEntered) {
      //   history.push("/access-code");
      //   return;
      // }
      (async () => {
        const response = await getTokenDetails();
        if (!response.ok) {
          localStorage.removeItem("x-access-token");
          localStorage.removeItem("isPremiumUser");
          localStorage.removeItem("isFirstUserLogin");
          history.push("/splash");
        }
      })();
    }
    componentDidUpdate(prevProps) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        window.scrollTo(0, 0);
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
