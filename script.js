const titleOnPageFromMockServer = document.querySelector('.title');
const descriptionFromNumeratedPost = document.querySelector('.description');
const commentsAddedAfterRender = document.querySelector('.list-of-comments');
const ourBtnOnpage = document.querySelector('.button')
const inputOnpage = document.querySelector('.comments')

class renderPageFromMockServer {
	constructor(id) {
		this.id = id;
		ourBtnOnpage.addEventListener('click', (event) => {
			if (event.target.dataset.action && inputOnpage.value !== '') {
				this.addNewCommentFromUser(inputOnpage.value);
				inputOnpage.value = '';
			}
		})
	}

	async getPosts() {
		let responseFromPosts = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`)
		if (responseFromPosts.ok) {
			return responseFromPosts.json()
		} else {
			console.warn('Error')
		}
	}

	async getCommentsFromPosts() {
		let commentsFromPosts = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.id}`)
		if (commentsFromPosts.ok) {
			return commentsFromPosts.json();
		} else {
			console.warn('Error')
		}
	}

	async renderPostsFromMockServer(posts, comments) {
		try {
			titleOnPageFromMockServer.innerHTML += `<p>${posts.id}. ${posts.title}</p>`;
			descriptionFromNumeratedPost.innerHTML += `<p>${posts.id}. ${posts.body}</p>`;
			let ourList = '';
			for (let comment of comments) {
				if (!comment) {
					return
				} else {
					ourList += `<p>${comment.id}. ${comment.name}</p> <p>${comment.email}</p> <p> ${comment.body}</p>`
				}
				commentsAddedAfterRender.innerHTML = ourList;
			}
		} catch {
			console.warn('Error')
		}
	}

	async addNewCommentFromUser(data) {
		try {
			let ourResponse = await fetch(`https://jsonplaceholder.typicode.com/comments`, {
				method: 'POST',
				body: JSON.stringify({
					id: this.id,
					body: data
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			});
			if (ourResponse.ok) {
				let correctComment = await ourResponse.json();

				function addingNewComment(comment) {
					let createdComment = document.createElement('p')
					createdComment.innerHTML = ` ${comment.body}`
					commentsAddedAfterRender.append(createdComment)
				}
				addingNewComment(correctComment)
			} else {
				console.warn('Error')
			}
		} catch {
			console.warn('Error')
		}
	}
}

const render = new renderPageFromMockServer(1)

async function getResultOnPage() {
	let post = await render.getPosts(1)
	let comment = await render.getCommentsFromPosts(1)
	let ourResult = await render.renderPostsFromMockServer(post, comment)
}

getResultOnPage()

console.log(1);

setTimeout(function () {
	console.log(2);
}, 100);

setTimeout(function () {
	console.log(3);
}, 0);

new Promise(function (resolve) {
	setTimeout(() => {
		resolve()
	}, 0)
}).then(() => {
	console.log(4)
})

console.log(5);