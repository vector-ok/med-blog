//
//
// import React, { Component } from "react";
// import { MDBContainer, MDBCol, MDBRow, MDBCollapse, MDBCard, MDBCardTitle, MDBCardBody, MDBIcon, MDBBtn } from "mdbreact";
// import card from '../assets/images/card.png';
// // import prof from '../assets/images/prof.png';
// import tooth from '../assets/images/tooth-build-alt.png';
// // import prof from '../assets/images/team/prof.png';
// // import odeh from '../assets/images/team/IMG-20201206-WA0000.jpg';
// // import yet from '../assets/images/team/IMG-20201206-WA0002.jpg';
// // import joy from '../assets/images/team/IMG-20201206-WA0001.jpg';
// // import keh from '../assets/images/team/IMG-20201208-WA0001.jpg';
// // import olu from '../assets/images/team/IMG-20201214-WA0000.jpg';
// // import anisa from '../assets/images/team/woman.png';
//
//
//
// class About extends Component {
// state={
//   collapseID: "collapse1"
// }
//
// toggleCollapse = collapseID => () =>
// this.setState(prevState => ({
//   collapseID: prevState.collapseID !== collapseID ? collapseID : ""
// }));
//
// render() {
//     return (
//       <div clssName="pb-5">
//         <MDBContainer className="bg-info pt-1 mb-5" fluid>
//           <div className="row my-5 pt-5">
//             <div className="col-12 d-flex px-0">
//               <img className="d-none d-sm-block img-fluid w-25 float-left" src={card} alt="hand holding smartphone" />
//               <img className="d-block d-sm-none img-fluid img-xs float-left align-self-end mt-5" src={card} alt="hand holding smartphone" />
//               <div className="align-self-center text-center">
//                 <h1 className="d-none d-sm-block display-4 pl-4">About Us</h1>
//                 <h2 className="d-block d-sm-none display-5-responsive pl-2">About Us</h2>
//               </div>
//             </div>
//           </div>
//         </MDBContainer>
//
//         <MDBContainer fluid className="bg-half-dark my-5 pb-5 px-md-5 text-left">
//           <h1 className="h1-responsive font-weight-bolder text-lora text-capitalize text-center my-4">Who We Are</h1>
//           <p className=""> <strong> Professor Emmanuel Olubusayo Ajayi Orthodontics Advancement Foundation </strong> is an 	incorporated Trust founded in 2019 to promote the highest levels of excellence in 	orthodontic education, research and management of patients by advancing the use of 	most contemporary knowledge in orthodontics, technology and materials to 	provide orthodontic care for the less 	privileged, elderly and the society amongst other 	laudable objectives of the Foundation.	</p>
//           <img className="float-right circle w-25 img-fluid pl-2" src={tooth} alt="tooth repair" />
//           <p>  Orthodontics is the sub-specialty of Dentistry that deals with growth of the face, development of dentition and the prevention and correction of occlusal anomalies.   The main objective of orthodontic care amongst others essentially is to ensure that all individuals have a straight, functional and healthy dentition; and also attractive, pleasing smile.</p>
//           <p> Orthodontic problems include malocclusion and mal-relationship of the arches, and other various occlusal variants which can negatively impact and affect the individual’s facial and dental aesthetics, oral function, self-esteem, interpersonal relationships and general quality of life. As such, orthodontic problems are of public health importance and they constitute a great concern as the abilities to chew one’s food, communicate orally, breathing, smiling and presenting a pleasing appearance enhance productive social interactions. </p>
//           <p><strong>Professor Emmanuel Olubusayo Ajayi Orthodontics Advancement Foundation</strong> partners with you to straighten your teeth, restore your oral health and give you back your smiles.
//           </p>
//         </MDBContainer>
//
//         <MDBContainer className="my-5 py-5">
//           <MDBCard
//             className="card-image bg-mission"
//           >
//             <div className="rgba-black-strong py-5 px-4">
//               <MDBRow className="d-flex justify-content-center">
//                 <MDBCol md="10" xl="8">
//                   <MDBCardTitle>
//                     <h1 className="font-weight-bolder text-lora text-capitalize text-center white-text"> What we stand for</h1>
//                   </MDBCardTitle>
//                   <MDBContainer className="accordion md-accordion accordion-5">
//                     <MDBCard className="mb-4">
//                       <div
//                         onClick={this.toggleCollapse("collapse1")}
//                         className="p-0 z-depth-1 primary-color text-uppercase white-text mb-0 d-flex justify-content-start align-items-center"
//                         tag="h4"
//                       >
//                         <div
//                           className="d-flex justify-content-center align-items-center mr-4 float-left vision-sect"
//                         >
//                           <MDBIcon
//                             icon="eye"
//                             size="2x"
//                             className="m-3 black-text"
//                           />
//                         </div>
//                         Our Vision
//                       </div>
//
//                       <MDBCollapse id="collapse1" isOpen={this.state.collapseID}>
//                         <MDBCardBody className="rgba-black-strong white-text z-depth-1">
//                           <p className="p-md-4 mb-0">
//                             Advancing high quality orthodontic education, evidenced-based research and state of 		the art 	equipments and dental facilities for provision of orthodontic care.
//                           </p>
//                         </MDBCardBody>
//                       </MDBCollapse>
//                     </MDBCard>
//
//                     <MDBCard className="mb-4">
//                       <div
//                         onClick={this.toggleCollapse("collapse2")}
//                         className="p-0 z-depth-1 primary-color text-uppercase white-text mb-0 d-flex justify-content-start align-items-center"
//                         tag="h4"
//                       >
//                         <div
//                           className="d-flex justify-content-center align-items-center mr-4 vision-sect"
//                         >
//                           <MDBIcon
//                             icon="binoculars"
//                             size="2x"
//                             className="m-3 black-text"
//                           />
//                         </div>
//                         Our Mission
//                       </div>
//
//                       <MDBCollapse id="collapse2" isOpen={this.state.collapseID}>
//                         <MDBCardBody className="rgba-black-strong white-text z-depth-1">
//                           <p className="p-md-4 mb-0">
//                             To promote highest levels of excellence in orthodontic education, research and management of patients by advancing the use of most contemporary knowledge in orthodontics, technology and materials to provide orthodontic care for the less privileged, elderly and the society.
//                           </p>
//                         </MDBCardBody>
//                       </MDBCollapse>
//                     </MDBCard>
//
//                     <MDBCard className="mb-4">
//                       <div
//                         onClick={this.toggleCollapse("collapse3")}
//                         className="p-0 z-depth-1 primary-color text-uppercase white-text mb-0 d-flex justify-content-start align-items-center"
//                         tag="h4"
//                       >
//                         <div
//                           className="d-flex justify-content-center align-items-center mr-4 vision-sect"
//                         >
//                           <MDBIcon
//                             icon="map-signs"
//                             size="2x"
//                             className="m-3 black-text"
//                           />
//                         </div>
//                         Aims & Objectives
//                       </div>
//
//                       <MDBCollapse id="collapse3" isOpen={this.state.collapseID}>
//                         <MDBCardBody className="rgba-black-strong white-text z-depth-1">
//                           <p className="p-md-4 mb-0">
//                             To promote highest levels of excellence in orthodontic education, research and 			management of patients by advancing the use of most contemporary knowledge in 			orthodontics, technology and materials to provide orthodontic care for the less 			privileged, elderly and the society.
//                           </p>
//                           <p className="p-md-4 mb-0">To promote, facilitate and organise scientific conferences, seminars, colloquiums and 	workshops in orthodontics, orthodontic management of patients and related subjects.</p>
//                           <p className="p-md-4 mb-0">To publish journals in orthodontics and dentofacial orthopaedics and other scientific 	papers and monographs including films and video tapes in orthodontics and related 	subjects for the advancement of orthodontic care for the less privileged and the general 	public.</p>
//                           <p className="p-md-4 mb-0">To provide access to electronic and print volumes of various journals of orthodontics 	and dentofacial orthopaedics and other related medical and dental scientific 	literatures for the advancement of orthodontic care for the less privileged and the 	general public.</p>
//                           <p className="p-md-4 mb-0">To carry out research and also support funding of cutting-edge and evidence-based 	research in orthodontics for the advancement of orthodontic care for the less privileged 	and the general public.</p>
//                           <p className="p-md-4 mb-0">To institute prizes and awards to orthodontic students and post-graduate residents to 	inspire scholarships and excellences for the advancement of orthodontic care.</p>
//                           <p className="p-md-4 mb-0">To create awareness about importance of orthodontic care to the general populace and 	facilitate the provision of quality orthodontic care.</p>
//                           <p className="p-md-4 mb-0">To partner with the industries, corporate bodies and well-meaning individuals to 	facilitate the provision of quality orthodontic care for the needy individuals.</p>
//                           <p className="p-md-4 mb-0">To partner with the industries in the designing and manufacturing of medical and dental 	equipments and related accessories to facilitate the provision of quality orthodontic 	care to the less privileged and the populace.</p>
//                           <p className="p-md-4 mb-0">To partner with individuals, societies, associations and organisations that share similar 	objectives with the foundation and also support other worthy causes that will lead to 	advancement of the arts and sciences of orthodontics as determined by the Trustees of 	the foundation.</p>
//                         </MDBCardBody>
//                       </MDBCollapse>
//                     </MDBCard>
//                   </MDBContainer>
//                 </MDBCol>
//               </MDBRow>
//             </div>
//           </MDBCard>
//         </MDBContainer>
//
//       </div>
//     );
//   }
// }
//
// export default About;
