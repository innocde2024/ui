/* eslint-disable no-restricted-syntax */
import { useState } from "react";
import MiniProfile from "../MiniProfile";
import Posts from "../Posts";
import CreatePost from "../CreatePost";
import { useAuth } from "../../context/authContext";

const Forum = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };
  const { isLogin } = useAuth();
  return (
    <div className="bg-color overflow-hidden">
      <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto mt-20">
        {/* Posts (Left) */}
        <section className="md:col-span-2">
          <Posts />
        </section>

        {/* MiniProfile (Right) */}
        <section className="hidden md:inline-grid md:col-span-1">
          {isLogin && (
            <div className="fixed w-[380px]">
              <MiniProfile onCreatePost={handleCreatePost} />
              {showCreatePost && <CreatePost />}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
export default Forum;
