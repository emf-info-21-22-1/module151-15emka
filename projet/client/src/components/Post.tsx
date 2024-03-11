export const Post = ({
    posts,
}: {
    posts:{
        username: string;
        datePub: string;
        comments: string;
    }[];
}) => {
    return(
        <>
            {posts.map((posts, idx: number) => (
            <div key={`rojects-${idx}`} className="bg-white border-b-2 border-gray-400 p-3">
                <div className="flex flex-col space-y-1">
                    <div className="flex flex-row items-center">
                        <div className="mr-2"><p className="bg-green-400 rounded-full h-9 w-9 flex items-center justify-center ">PP</p></div>
                        <h1 className="basis-5/6">{posts.username}</h1>
                        <p className="basis-1/6">{posts.datePub}</p>
                    </div>
                    <div className="border-l-2 border-gray-300 p-3 ml-4">
                        {posts.comments}
                    </div>
                </div>
            </div>
            ))}
        </>
    );
}