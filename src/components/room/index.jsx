// // src/components/LiveStream.js
import React from 'react';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
const RoomPage = () => {
    const {roomId}=useParams();
    const myMeeting=async(element)=>{
        const appId=1264208429;
        const serverSecret="a22156f922093e322880a6c4f1f10630";
        const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appId,serverSecret,roomId,Date.now().toString(),"Mentor");
        const zp=ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container : element,
            scenario: {
                mode:ZegoUIKitPrebuilt.VideoConference,
            },

        }
        );
    };
  return(
<div ref={myMeeting}></div>
  )
};

export default RoomPage;


// import React from 'react';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { useParams } from 'react-router-dom';

// const RoomPage = () => {
//   const { roomId } = useParams();

//   const myMeeting = async (element) => {
//     const appId = 1264208429;
//     const serverSecret = "a22156f922093e322880a6c4f1f10630";
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, Date.now().toString(), "Mentor");
//     const zp = ZegoUIKitPrebuilt.create(kitToken);

//     zp.joinRoom({
//       container: element,
//       scenario: {
//         mode: ZegoUIKitPrebuilt.VideoConference,
//       },
//     });

//     // After joining the room, send a message to the Chrome extension
//     if (chrome && chrome.runtime) {
//       chrome.runtime.sendMessage(
//         "YOUR_EXTENSION_ID", // Replace with your extension's ID
//         { type: "START_STREAM", roomId },
//         (response) => {
//           console.log("Response from extension:", response);
//         }
//       );
//     }
//   };

//   return <div ref={myMeeting}></div>;
// };

// export default RoomPage;