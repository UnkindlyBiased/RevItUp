import { FaGithub, FaTelegram } from 'react-icons/fa6'

function SocialLinks(): React.ReactElement {
    return (
        <div className="flex space-x-2 md:space-x-5">
            <a href="https://github.com/UnkindlyBiased" target='_blank'>
                <FaGithub size={30} />
            </a>
            <a href='https://t.me/ltkreuer' target='_blank'>
                <FaTelegram size={30} />
            </a>
        </div>
    )
}

export default SocialLinks