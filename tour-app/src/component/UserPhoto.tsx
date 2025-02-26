function UserPhoto({ imgSrc }: { imgSrc: string }) {
    return (
        <img src={imgSrc} alt="Profile Photo" className="h-10 w-10 rounded-full" />
    )
}

export default UserPhoto