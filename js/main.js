const inpName = document.getElementById('siteName');
const inpUrl = document.getElementById('siteUrl');
const submit = document.getElementById('subbtn');


const submitData = (e) => {

	if(!inpName.value || !inpUrl.value) {
		alert('Please fill in the form');
		return;
	}

	console.log(inpName.value);
	e.preventDefault();

	const bookmark = {
		name: inpName.value,
		url: inpUrl.value
	}

	if(localStorage.getItem('bookmarks') === null){
		const bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	inpName.value = '';
	inpUrl.value = '';
	
	showBookmark();
	
	
}

const deleteBookmark = (url) => {
	const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(let i = 0; i < bookmarks.length; i++){
		if(url === bookmarks[i].url){
			bookmarks.splice(i , 1);
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		}
	}
	showBookmark();
}

const showBookmark = () => {
	const div = document.getElementById('bookmarksResults');
	div.innerHTML = '';
	const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(let i = 0; i < bookmarks.length; i++){
		const divs = document.createElement('div');
		divs.classList.add('well');
		div.append(divs);
		const ul = document.createElement('ul');
		ul.style.listStyle = 'none';
		divs.append(ul);
		const li = document.createElement('li');
		ul.append(li);
		
		li.innerHTML = `<h3>${bookmarks[i].name} <a href='${bookmarks[i].url}' target='_blank' class='btn btn-default'>Visit</a>
		                     <a onclick = 'deleteBookmark("${bookmarks[i].url}")' class='btn btn-danger'>Delete</a></h3>`;
		

	}
}

submit.addEventListener('click',submitData);