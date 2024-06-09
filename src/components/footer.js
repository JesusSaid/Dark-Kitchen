import { SocialIcon } from 'react-social-icons';
import Style from '../styles/footer.module.css'

export default function Footer() {
    return (
        <footer className={Style.footerContainer}>
            <div className={Style.contentContainer}>
                <div className={Style.socialIcons}>
                    <SocialIcon url="https://github.com/XPTSoftware" network="github" className="redes" target="_blank" fgColor="#fff" style={{height:28, width:28}} />
                    {/*<SocialIcon url='https://wa.me/529514084765/?text=Hola,%20buen%20día,%20quisiera%20contratar%20sus%20servicios%20:).' network="whatsapp" className="redes" target="_blank" fgColor="#fff" style={{height:28, width:28}} />*/}
                </div>
                <p>© 2024 Made by: XPT. All rights reserved.</p>
            </div>
        </footer>
    );
}
