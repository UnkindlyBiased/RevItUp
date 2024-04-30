import UserDetailed from "@/types/data/users/UserDetailed";
import UserPage from "../UserPage";

function PortalUserPage() {
    const user: UserDetailed = {
        id: 69420,
        username: "Taras Blyzniuk",
        registrationDate: new Date(),
        biography: null,
        country: {
            id: 1,
            name: "Ukraine",
            countryCode: "UA",
            flagImgLink: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/UA.svg"
        },
        isVerified: true,
        emailAddress: "it"
    }

    return <UserPage user={user} />
}

export default PortalUserPage