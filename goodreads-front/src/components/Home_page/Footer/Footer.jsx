import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './Footer.css';
import '../../fonts/Vazir.ttf';
import { SocialIcon } from 'react-social-icons';


const FooterPagePro = () => {
  return (
      <div className="footer">
    <MDBFooter color="#6632a1" className="page-footer font-small pt-0">
      <div style={{ backgroundColor: "white" }}>
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow className="py-4 d-flex align-items-center">
            <MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
            </MDBCol>
            <MDBCol md="6" lg="7" className="text-center text-md-right">
              <a className="fb-ic ml-0">
                <i className="fab fa-facebook-f white-text mr-lg-4"> </i>
              </a>
              <a className="tw-ic">
                <i className="fab fa-twitter white-text mr-lg-4"> </i>
              </a>
              <a className="gplus-ic">
                <i className="fab fa-google-plus-g white-text mr-lg-4"> </i>
              </a>
              <a className="li-ic">
                <i className="fab fa-linkedin-in white-text mr-lg-4"> </i>
              </a>
              <a className="ins-ic">
                <i className="fab fa-instagram white-text mr-lg-4"> </i>
              </a>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <MDBContainer className="mt-5 mb-4 text-center text-md-left">
        <MDBRow className="mt-3">
        <MDBCol md="4" lg="3" xl="3" className="mb-4">
            <h6 className="text-uppercase font-weight-bold">
              <strong  className="rwtxt" style={{color:"#28c5cc"}}>ارتباط با ما</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
            <p className="rwtxt" style={{color:"#28c5cc"}}>
              <i className="fa fa-home mr-3" /> تهران - خیابان گاندی جنوبی - نبش خیابان ۲۱ - پلاک ۲۸
            </p>
            <p className="rwtxt" style={{color:"#28c5cc"}}>
              <i className="fa fa-envelope mr-3" /> info@goodreads.com
            </p>
          </MDBCol>

          <MDBCol md="2" lg="2" xl="2" className="mb-4">
            <h6 className="text-uppercase font-weight-bold">
              <strong className="rwtxt" style={{color:"#28c5cc"}}>ما را در اینستاگرام دنبال کنید</strong>
            </h6>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
            <p>
              <SocialIcon url="https://www.instagram.com/goodreads/?hl=en" />
            </p>
          </MDBCol>
          
          <MDBCol md="2" lg="2"  xl="3" className="mb-4">
            <h6 className="text-uppercase font-weight-bold">
              <strong className="rwtxt" style={{color:"#28c5cc"}}>لینک هایی که ممکن است دوست داشته باشید</strong>
            </h6>
            <p >
              <a href="https://fidibo.com/" className="rwtxt" style={{color:"#28c5cc"}}>فیدیبو</a>
            </p>
            <p>
              <a href="https://taaghche.com/" className="rwtxt" style={{color:"#28c5cc"}}>طاقچه</a>
            </p>
          </MDBCol>
          <MDBCol md="3" lg="4" xl="3" className="mb-4">
            <h5 className="text-uppercase font-weight-bold">
              <strong style={{color:"#28c5cc"}} className="rwtxt">گودریدز</strong>
            </h5>
            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
            <p style={{color:"#28c5cc"}} className="rwtxt">یک شبکه اجتماعی برای تعامل بیشتر 
            بین کتاب دوستان است</p>
          </MDBCol>
 
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
         
        </MDBContainer>
      </div>
    </MDBFooter>
    </div>
  );
}

export default FooterPagePro;