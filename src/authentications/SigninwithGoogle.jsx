import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth,db } from "./firebaseConfig";
import GoogleButton from "react-google-button";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignInwithGoogle() {
  const nav=useNavigate();
  const googleLogin=()=> {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;  
      console.log(result);
      const user = result.user;
      if (user) {
        setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: user.displayName,
          phone: user.phoneNumber,
        }).then(() => {
          console.log(`${user.email} ${user.displayName} ${user.phoneNumber}`);
          nav('/home');
        }).catch((error) => {
          console.error("Error writing document: ", error);
        });
      }
    })
    .catch((error) => {
    
      console.log(`${error.code}: ${error.message} on email: ${error.customData ? error.customData.email : 'unknown'}`);
    });
  }
  return (
    <div>
      
      <div className="flex justify-center cursor-pointer" onClick={googleLogin}>
      <GoogleButton
      onClick={() => { console.log('Google button clicked'); }}
    />
      </div>
    </div>
  );
}
export default SignInwithGoogle;