import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const FOOTER = {
    CONTACT: {
        title: "addressTL",
        content: [
            {
                title: "headquartersTL",
                description: "addressHeadquartersTL",
            },
            {
                title: "officeTL",
                description: "addressOfficeTL",
            },
            {
                title: "Hotline",
                description: "0919 365 363",
            },
            {
                title: "Email",
                description: "tuyendung@r2s.com.vn",
            },
        ]
    },
    ABOUT: {
        title: "aboutItJOBSTL",
        content: [
            {
                description: <Link to='/'>{"aboutUsTL"}</Link>
            },
            {
                description: <Link to='/about-us'>aboutUsTL</Link>
            },
            {
                description: <Link to='/help'>frequentlyAskedQuestionsTL</Link>
            },
        ]
    },
    POLICY: {
        title: "policyTL",
        content: [
            {
                description: <Link to='/privacy-policy'>privacyPolicyTL</Link>
            },
            {
                description: <Link to='/terms-of-services'>termsOfServiceTL</Link>
            },
            {
                description: <Link to='/regulation'>regulationTL</Link>
            },
        ]
    },
    MOBILE: {
        title: "mobileApplicationTL",
        content: [
            {
                description: <Link to='/comming-soon' >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                        alt=""
                        style={{ width: "170px" }}
                    />
                </Link>
            },
            {
                description: <Link to='/comming-soon' >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Available_on_the_App_Store_%28black%29.png"
                        alt=""
                        style={{ width: "170px" }}
                    />
                </Link>
            }
        ]
    }
}