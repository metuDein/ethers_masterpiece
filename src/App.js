import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Intro from "./components/Intro";
import Missing from "./components/Missing";
import EmailProcess from "./components/Authentication/EmailProcess";
import CollectionPage from "./components/AssetDetails.js/CollectionPage";
import ItemPage from "./components/AssetDetails.js/ItemPage";
import FaqHub from "./components/FAQ/FaqHub";
import ReviewsCenter from "./components/blogsandreviews/ReviewsCenter";
import BlogsCenter from "./components/blogsandreviews/BlogsCenter";
import Blog from "./components/blogsandreviews/Blog";
import SupportCenter from "./components/Support/SupportCenter";
import UserCreateCollection from "./components/User/usercreate/UserCreateCollection";
import UserCreateAsset from "./components/User/usercreate/UserCreateAsset";
import Deposit from "./components/User/usertransactions/Deposit";
import Withdraw from "./components/User/usertransactions/Withdraw";
import UserProfile from "./components/User/UserProfile";
import UserEditProfile from "./components/User/UserEditProfile";
import UserEditAsset from "./components/User/UserEditAsset";
import UserNotfication from "./components/User/UserNotfication";
import UserNotifications from "./components/User/UserNotifications";
import UserVerificationRequest from "./components/User/UserVerificationRequest";
import AdminPanel from "./components/Admin/Adminpages/AdminPanel";
import AdminAllAsssets from "./components/Admin/Adminpages/AdminAllAsssets";
import AdminAllCollection from "./components/Admin/Adminpages/AdminAllCollection";
import AdminAllMessages from "./components/Admin/Adminpages/AdminAllMessages";
import AdminAllUSers from "./components/Admin/Adminpages/AdminAllUSers";
import AdminViewMessage from "./components/Admin/Adminpages/AdminViewMessage";
import AdminCreateMessage from "./components/Admin/AdminActions/AdminCreateMessage";
import AdminCreateNewAsset from "./components/Admin/AdminActions/AdminCreateNewAsset";
import AdminCreateNewCollection from "./components/Admin/AdminActions/AdminCreateNewCollection";
import AdminEditAsset from "./components/Admin/AdminActions/AdminEditAsset";
import AdminEditCollection from "./components/Admin/AdminActions/AdminEditCollection";
import Linkpage from "./components/Test/Linkpage";
import AdminUserEdit from "./components/Admin/AdminActions/AdminUserEdit";
import EmailLogin from "./components/Authentication/EmailLogin";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./api/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Image from "./components/Test/Image";
import TermsAndConditions from "./components/FAQ/FAQFractions.js/TermsAndConditions";
import CollectionDetails from "./components/AssetDetails.js/details/CollectionDetails";
import UserEditCollection from "./components/User/UserEditCollection";
import ItemDetails from "./components/AssetDetails.js/details/ItemDetails";
import Collection from "./components/marketplace/Collection";
import WalletIntegretion from "./components/FAQ/FAQFractions.js/WalletIntegretion";
import WhatIsAnNft from "./components/FAQ/FAQFractions.js/WhatIsAnNft";
import HowToCreateaCollection from "./components/FAQ/FAQFractions.js/HowToCreateaCollection";
import HowToCreatAnNft from "./components/FAQ/FAQFractions.js/HowToCreatAnNft";
import HowToBuyNft from "./components/FAQ/FAQFractions.js/HowToBuyNft";
import WhoIsEthersMasterPiece from "./components/FAQ/FAQFractions.js/WhoIsEthersMasterPiece";
import { useEffect } from "react";
import Cart from "./components/User/cart/Cart";

function App() {

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* PUBLIC ROUTES */}
        <Route path={'/'} element={<Intro />} />

        <Route path={'/linkpage'} element={<Linkpage />} />
        <Route path={'/image'} element={<Image />} />


        {/* collections and assets sections */}
        <Route path="/itempage/:id" element={<ItemDetails />} />

        <Route path="/all-collections" element={<CollectionPage />} />
        <Route path="/all-itempage" element={<ItemPage />} />
        <Route path="/collection/:id" element={<Collection />} />

        {/* user authentications */}
        <Route path="/user-authentication-register" element={<EmailProcess />} />
        <Route path="/user-authentication-login" element={<EmailLogin />} />

        {/* frequently asked questions */}
        <Route path="/frequently-asked-questions" element={<FaqHub />} />
        <Route path="/how-to-connect-wallet" element={<WalletIntegretion />} />
        <Route path="/how-to-create-a-collection" element={<HowToCreateaCollection />} />
        <Route path="/how-to-create-an-asset" element={<HowToCreatAnNft />} />
        <Route path="/what-is-an-NFT" element={<WhatIsAnNft />} />
        <Route path="/How-to-buy-an-asset" element={<HowToBuyNft />} />
        <Route path="/term-and-conditions" element={<TermsAndConditions />} />
        <Route path="/about-us" element={<WhoIsEthersMasterPiece />} />



        {/* blog and reviews */}
        <Route path="/blogs-center" element={<BlogsCenter />} />
        <Route path="/blog-center/:title" element={<Blog />} />
        <Route path="/reviews-center" element={<ReviewsCenter />} />

        {/* support request */}
        <Route path="/support-center" element={<SupportCenter />} />

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* END OF THE PUBLIC ROUTES */}


        {/* PROTECTED ROUTES */}

        <Route element={<PersistLogin />}>

          {/* USER PROTECTED ROUTES */}
          <Route element={<RequireAuth allowedRoles={[2001]} />}>

            <Route path={`/my-profile`} element={<UserProfile />} />
            {/* USER CREATE */}
            <Route path={`/create-collection`} element={<UserCreateCollection />} />
            <Route path={`/create-asset`} element={<UserCreateAsset />} />

            {/* USER TRANSACTIONS */}
            <Route path={`/new-deposit-request`} element={<Deposit />} />
            <Route path={`/new-withdrawal-request`} element={<Withdraw />} />
            <Route path={`/my-cart-list`} element={<Cart />} />

            {/* USER EDIT ACTIONS */}
            <Route path={`/edit-my-profile`} element={<UserEditProfile />} />
            <Route path={`/edit-asset/:id`} element={<UserEditAsset />} />
            <Route path={`/edit-collection/:id`} element={<UserEditCollection />} />
            <Route path="/my-collection/:id" element={<CollectionDetails />} />

            {/* USER NOTIFICATIONS */}
            <Route path={`/mynoftifications`} element={<UserNotifications />} />
            <Route path={`/mynoftification/:id`} element={<UserNotfication />} />


            {/* VERIFICATION REQUESTS */}
            <Route path={`/new-verification-request`} element={<UserVerificationRequest />} />
          </Route>

          {/* END OF THE USER PROTECTED ROUTES*/}


          {/* ADMIN PROTECTED ROUTES */}
          <Route element={<RequireAuth allowedRoles={[5150]} />}>
            {/* ADMIN PAGES */}
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/admin-all-assets" element={<AdminAllAsssets />} />
            <Route path="/admin-all-collection" element={<AdminAllCollection />} />
            <Route path="/admin-all-message" element={<AdminAllMessages />} />
            <Route path="/admin-message/:id" element={<AdminViewMessage />} />
            <Route path="/admin-all-users" element={<AdminAllUSers />} />

            {/* ADMIN ACTIONS */}
            <Route path="/new-outbox-message" element={<AdminCreateMessage />} />
            <Route path="/admin-create-new-asset" element={<AdminCreateNewAsset />} />
            <Route path="/admin-create-new-collection" element={<AdminCreateNewCollection />} />
            <Route path="/admin-edit-asset/:assetID" element={<AdminEditAsset />} />
            <Route path="/admin-edit-collection/:collectionID" element={<AdminEditCollection />} />
            {/* <Route path="/admin-edit-user/:userID" element={<AdminEditUser />} /> */}
            <Route path="/admin-edit-user/:userID" element={<AdminUserEdit />} />

          </Route>
          {/* END OF ADMIN PROTECTED ROUTES  */}
        </Route>

        {/* catch all */}

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App;
