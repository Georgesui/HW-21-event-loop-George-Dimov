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

	async renderPostsFromMockServer(data) {
		try {
			let ourPost = await this.getPosts();
			titleOnPageFromMockServer.innerHTML += `<p>${ourPost.id}. ${ourPost.title}</p>`;
			descriptionFromNumeratedPost.innerHTML += `<p>${ourPost.id}. ${ourPost.body}</p>`;
			let ourComments = await this.getCommentsFromPosts();
			let ourList = '';
			for (let comment of ourComments) {
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
			await fetch(`https://jsonplaceholder.typicode.com/comments`, {
					method: 'POST',
					body: JSON.stringify({
						id: this.id,
						body: data
					}),
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				})
				.then((comment) => comment.json())
				.then((comment) => {
					let createdComment = document.createElement('p')
					createdComment.innerHTML = `  ${comment.body}`
					commentsAddedAfterRender.append(createdComment)
				})
		} catch {
			console.warn('Error')
		}
	}
}

const render = new renderPageFromMockServer(1)
render.renderPostsFromMockServer()


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
}).then(()=>{})

console.log(5);