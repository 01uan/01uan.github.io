// Load blog posts from a JSON file
async function loadBlogPosts() {
    try {
        const response = await fetch('../data/blogs.json');
        const blogPosts = await response.json();
        renderBlogPosts(blogPosts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.querySelector('.blog-container').innerHTML = 
            '<h3><b>Failed to load blog posts. Please try again later.</b></h3>';
    }
}

function renderBlogPosts(blogPosts) {
    const blogContainer = document.querySelector('.blog-container');
    
    blogPosts.forEach(post => {
        const blogPost = document.createElement('article');
        blogPost.classList.add('blog-post');
        
        blogPost.innerHTML = `
            <h3><u><a href="${post.url}">${post.title}</a></u></h3>
            <div class="blog-date">${post.date}</div>
            <div class="blog-excerpt">${post.excerpt}</div>
        `;
        
        blogContainer.appendChild(blogPost);
    });
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);