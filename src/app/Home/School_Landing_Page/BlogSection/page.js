import Link from 'next/link';

const blogs = [
    {
        blog_title: "Transforming Education with Digital Solutions",
        blog_slug: "transforming-education-digital-solutions",
        published_date_time: "March 26, 2025, 10:00 AM",
        author_name: "Omnath Dube",
        blog_content: "In today's world, digital transformation in education is more important than ever. Vaekon School offers a comprehensive suite of digital tools to enhance learning, streamline operations, and ensure student success.",
        blog_tags: ["Education", "Technology", "Digital Learning"],
        blog_category: "Education Technology",
        blog_comments: [],
        meta_title: "Transforming Education with Digital Solutions | Vaekon School",
        meta_description: "Learn how Vaekon School is revolutionizing education with digital solutions.",
        meta_keywords: "Education, Digital Learning, Technology, Vaekon School"
    },
    {
        blog_title: "The Future of Online Learning Platforms",
        blog_slug: "future-of-online-learning-platforms",
        published_date_time: "March 24, 2025, 03:45 PM",
        author_name: "Omnath Dube",
        blog_content: "Artificial Intelligence is reshaping education by personalizing learning experiences. With Vaekon School, institutions can harness AI-driven insights to track academic progress and enhance student engagement.",
        blog_tags: ["AI", "E-Learning", "Education"],
        blog_category: "Artificial Intelligence in Education",
        blog_comments: [],
        meta_title: "The Future of Online Learning Platforms | Vaekon School",
        meta_description: "Understanding the role of AI in modern education and how it enhances learning experiences.",
        meta_keywords: "AI, E-Learning, Education, Technology"
    }
];

const BlogSection = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-[#F3E5F5] via-[#E1BEE7] to-[#F3E5F5] text-[#6A1B9A]">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-semibold text-[#4A148C] mb-6">Latest Blogs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog, index) => (
              <div key={index} className="p-6 bg-[#fff] rounded-lg shadow-lg border border-[#AB47BC] hover:border-[#6A1B9A] transition-all hover:shadow-2xl">
                <h3 className="text-2xl font-semibold text-[#6A1B9A]">{blog.blog_title}</h3>
                <p className="text-lg text-gray-700 mt-2">{blog.meta_description}</p>
                <div className="text-gray-600 text-sm mt-3">
                  <span>By <span className="text-[#4A148C]">{blog.author_name}</span></span> &bull;
                  <span> {blog.published_date_time}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {blog.blog_tags.map((tag, i) => (
                    <span key={i} className="text-sm px-3 py-1 bg-[#4A148C] text-white font-semibold rounded-full">#{tag}</span>
                  ))}
                </div>
                <p className="text-gray-700 mt-4">{blog.blog_content}</p>
                <div className="mt-4">
                  <Link href={`/blog/${blog.blog_slug}`} className="text-[#6A1B9A] hover:text-purple-800 font-semibold text-lg">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blogs">
              <button className="px-6 py-3 text-lg font-semibold text-white bg-[#4A148C] hover:bg-purple-800 transition-all rounded-full shadow-lg hover:scale-105 hover:shadow-2xl">
                Read All Blogs
              </button>
            </Link>
          </div>
        </div>
      </section>
      

    );
}

export default BlogSection;
