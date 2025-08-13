import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from '../Screens/Home/HomeScreen.js';
import ContactUsScreen from '../Screens/ContactUs/ContactUsScreen.js';
import LatestNewsScreen from '../Screens/LatestNews/LatestNewsScreen.js';
import RegisterScreen from '../Screens/Register/RegisterScreen.js';
import UsernamePasswordScreen from '../Screens/Register/UsernamePassword.js';

import LoginScreen from '../Screens/Login/LoginScreen.js';
import MemberLoginScreen from '../Screens/MemberLogin/MemberLoginScreen.js';

import LoginSuccessScreen from '../Screens/LoginSuccess/LoginSuccess.js';
import YourContributionHomeScreen from '../Screens/YourContribution/YourContributionHomeScreen.js';
import YourContributionScreen from '../Screens/YourContribution/YourContributionScreen.js';
import PayDirectScreen from '../Screens/YourContribution/PayDirectScreen.js';

import CategoryScreen from '../Screens/Post/CategoryScreen.js';
import SubCategoryScreen from '../Screens/Post/SubCategoryScreen.js';
import SubSubCategoryScreen from '../Screens/Post/SubSubCategoryScreen.js';
import SubSubSubCategoryScreen from '../Screens/Post/SubSubSubCategoryScreen.js';
import PostScreens from '../Screens/Post/PostScreen.js';
import SinglePost from '../Screens/Post/SinglePost.js';


import PayThruAppScreen from '../Screens/YourContribution/PayThruAppScreen.js';
import PayNow from '../Screens/YourContribution/PayNow.js';
import ConfirmPay from '../Screens/YourContribution/ConfirmPay.js';


import PaymentSuccessScreen from '../Screens/YourContribution/PaymentSuccess.js';


import SelectCountryScreen from '../Screens/Payment/SelectCountryScreen.js';
import InternationalScreen from '../Screens/Payment/InternationalScreen.js';
import PayScreen from '../Screens/Payment/PayScreen.js';
import PaymentGateway from '../Screens/Payment/PaymentGateway.js';
import IndiaScreen from '../Screens/Payment/IndiaScreen.js';


import SingleVideo from '../Components/Video/SingleVideo.js';
import FeedbackScreen from '../Screens/Feedback/FeedbackScreen.js';

import OrderHistoryScreen from '../Screens/OrderHistory/OrderHistoryScreen.js';
import AlbumImage from '../Components/Image/AlbumImage.js';

import InterviewScreen from '../Screens/Videos/InterviewScreen.js';
import EditProfileScreen from '../Screens/Profile/EditProfileScreen.js';
import EditUsernamePasswordScreen from '../Screens/Profile/EditUsernamePassword.js';

import OneDayFreeTrialScreen from '../Screens/OneDayFreeTrial/OneDayFreeTrialScreen.js';

// import BibleStudyScreen from '../Screens/BibleStudy/BibleStudyScreen.js';
// import BibleBooksScreen from '../Screens/BibleBooks/BibleBooksScreen.js'; 
// import OldTestamentScreen from '../Screens/OldTestament/OldTestamentScreen.js';
// import GenesisScreen from '../Screens/Genesis/GenesisScreen.js';
// import NewTestamentScreen from '../Screens/NewTestament/NewTestamentScreen.js';
// import MattScreen from '../Screens/Matt/MattScreen.js';
// import MemberLoginHomeScreen from '../Screens/MemberLogin/MemberLoginHomeScreen.js';
// import LoginMemberScreen from '../Screens/MemberLogin/LoginMemberScreen.js';
// import BibleSubjectScreen from '../Screens/BibleSubject/BibleSubjectScreen.js';
// import BibleReadingScreen from '../Screens/BibleReading/BibleReadingScreen.js';
// import BibleReadingOldTestamentScreen from '../Screens/BibleReading/BibleReadingOldTestamentScreen.js';
// import BibleReadingNewTestamentScreen from '../Screens/BibleReading/BibleReadingNewTestamentScreen.js';
// import BibleReadingGenesisScreen from '../Screens/BibleReading/BibleReadingGenesisScreen.js';
// import BibleReadingMattScreen from '../Screens/BibleReading/BibleReadingMattScreen.js';
// import BibleDramaScreen from '../Screens/BibleDrama/BibleDramaScreen.js';
// import VideosScreen from '../Screens/Videos/VideosScreen.js';
// import HindiMessageScreen from '../Screens/Videos/HindiMessageScreen.js';
// import TgcSongsScreen from '../Screens/Videos/TgcSongsScreen.js';
// import ShortFilmPlayScreen from '../Screens/Videos/ShorFilmPlayScreen.js';
// import YoutubeScreen from '../Screens/Videos/YoutubeScreen.js';
// import TopicPlaylistScreen from '../Screens/Videos/TopicPlaylistScreen.js';
// import AllVideosScreen from '../Screens/Videos/AllVideosScreen.js';
// import AudioScreen from '../Screens/Audios/AudioScreen.js';
// import CounsellingScreen from '../Screens/Audios/CounsellingScreen.js';
// import BookScreen from '../Screens/Books/BookScreen.js';
// import TgcBookScreen from '../Screens/Books/TgcBookScreen.js';
// import OtherBookScreen from '../Screens/Books/OtherBookScreen.js';
// import LiteratureScreen from '../Screens/Literature/LiteratureScreen.js';
// import ArticleScreen from '../Screens/Literature/ArticleScreen.js';
// import PdfDownloadScreen from '../Screens/Literature/PdfDownloadScreen.js';
// import ZaruriSuchnaScreen from '../Screens/ZaruriSuchna/ZaruriSuchnaScreen.js';
// import TgcPhotoScreen from '../Screens/TgcPhoto/TgcPhotoScreen.js';
// import DevotionScreen from '../Screens/Devotion/DevotionScreen.js';
// import ChildrenBibleScreen from '../Screens/ChildrenBibleSchool/ChildrenBibleSchoolScreen.js';
// import TeenBibleSchoolScreen from '../Screens/TeenBibleSchool/TeenBibleSchoolScreen.js';




const Stack = createNativeStackNavigator();

const isLogedIn = 0;


const StackNavigation = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      animation: 'fade',
    }}
  >
    

    {/* {
      (isLogedIn==1) ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      )
      : 
      (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        </>
      )
    } */}
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="LoginSuccess" component={LoginSuccessScreen} />

    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="UsernamePassword" component={UsernamePasswordScreen} />
    
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="EditUsernamePassword" component={EditUsernamePasswordScreen} />

    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    <Stack.Screen name="LatestNews" component={LatestNewsScreen} />

    <Stack.Screen name="MemberLogin" component={MemberLoginScreen} />

    <Stack.Screen name="Category" component={CategoryScreen} />
    <Stack.Screen name="SubCategory" component={SubCategoryScreen} />
    <Stack.Screen name="SubSubCategory" component={SubSubCategoryScreen} />
    <Stack.Screen name="SubSubSubCategory" component={SubSubSubCategoryScreen} />
    <Stack.Screen name="Post" component={PostScreens} />
    <Stack.Screen name="SinglePost" component={SinglePost} />

    <Stack.Screen name="YourContributionHome" component={YourContributionHomeScreen} />
    <Stack.Screen name="YourContribution" component={YourContributionScreen} />



    {/* payment navigations */}
    <Stack.Screen name="PayDirect" component={PayDirectScreen} />
    <Stack.Screen name="PayThruApp" component={PayThruAppScreen} />
    <Stack.Screen name="PayNow" component={PayNow} />
    <Stack.Screen name="ConfirmPay" component={ConfirmPay} />
    <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
    <Stack.Screen name="SelectCountryScreen" component={SelectCountryScreen} />
    <Stack.Screen name="International" component={InternationalScreen} />
    <Stack.Screen name="India" component={IndiaScreen} />
    <Stack.Screen name="Pay" component={PayScreen} />
    <Stack.Screen name="PaymentGateway" component={PaymentGateway} />
    
    <Stack.Screen name="SingleVideo" component={SingleVideo} />





    <Stack.Screen name="Interview" component={InterviewScreen} />
    
    <Stack.Screen name="AlbumImage" component={AlbumImage} />

    <Stack.Screen name="Feedback" component={FeedbackScreen} />

    <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />

    <Stack.Screen name="OneDayFreeTrial" component={OneDayFreeTrialScreen} />

    {/* <Stack.Screen name="NewTestament" component={NewTestamentScreen} /> */}
    {/* <Stack.Screen name="Matt" component={MattScreen} /> */}
    {/* <Stack.Screen name="MemberLoginHome" component={MemberLoginHomeScreen} /> */}
    {/* <Stack.Screen name="LoginMember" component={LoginMemberScreen} /> */}    
    {/* <Stack.Screen name="BibleSubjects" component={BibleSubjectScreen} /> */}
    {/* <Stack.Screen name="BibleReading" component={BibleReadingScreen} /> */}
    {/* <Stack.Screen name="BibleReadingOldTestament" component={BibleReadingOldTestamentScreen} /> */}
    {/* <Stack.Screen name="BibleReadingGenesis" component={BibleReadingGenesisScreen} /> */}
    {/* <Stack.Screen name="BibleReadingNewTestament" component={BibleReadingNewTestamentScreen} /> */}
    {/* <Stack.Screen name="BibleReadingMatt" component={BibleReadingMattScreen} /> */}
    {/* <Stack.Screen name="BibleDrama" component={BibleDramaScreen} /> */}
    {/* <Stack.Screen name="Videos" component={VideosScreen} /> */}
    {/* <Stack.Screen name="HindiMessage" component={HindiMessageScreen} /> */}
    {/* <Stack.Screen name="TgcSongs" component={TgcSongsScreen} /> */}
    {/* <Stack.Screen name="ShortFilmPlay" component={ShortFilmPlayScreen} /> */}
    {/* <Stack.Screen name="Youtube" component={YoutubeScreen} /> */}
    {/* <Stack.Screen name="TopicPlaylist" component={TopicPlaylistScreen} /> */}
    {/* <Stack.Screen name="AllVideos" component={AllVideosScreen} /> */}
    {/* <Stack.Screen name="Audio" component={AudioScreen} /> */}
    {/* <Stack.Screen name="Counselling" component={CounsellingScreen} /> */}
    {/* <Stack.Screen name="Book" component={BookScreen} /> */}
    {/* <Stack.Screen name="TgcBook" component={TgcBookScreen} /> */}
    {/* <Stack.Screen name="OtherBook" component={OtherBookScreen} /> */}
    {/* <Stack.Screen name="Literature" component={LiteratureScreen} /> */}
    {/* <Stack.Screen name="Article" component={ArticleScreen} /> */}
    {/* <Stack.Screen name="PdfDownload" component={PdfDownloadScreen} /> */}
    {/* <Stack.Screen name="ZaruriSuchna" component={ZaruriSuchnaScreen} /> */}
    {/* <Stack.Screen name="TgcPhoto" component={TgcPhotoScreen} /> */}
    {/* <Stack.Screen name="Devotion" component={DevotionScreen} /> */}
    {/* <Stack.Screen name="ChildrenBibleSchool" component={ChildrenBibleScreen} /> */}
    {/* <Stack.Screen name="TeenBibleSchool" component={TeenBibleSchoolScreen} /> */}
    
  </Stack.Navigator>
);

export default StackNavigation;
