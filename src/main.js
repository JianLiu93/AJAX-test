let getCSS = document.querySelector('.getCSS');
let getJS = document.querySelector('.getJS');
let getHTML = document.querySelector('.getHTML');
let getXML = document.querySelector('.getXML');
let getJSON = document.querySelector('.getJSON');
let getPage = document.querySelector('.getPage');
let pages = document.querySelector('.pageList');
let page = 1;

// CSS 动态加载
getCSS.onclick = () => {
	const request = new XMLHttpRequest();
	request.open('GET', '/style.css');
	request.onreadystatechange = () => {
		if(request.readyState === 4) {
			if(request.status === 200) {
				console.log(request.response);
				const style = document.createElement('style');
				style.innerHTML = request.response;
				document.head.appendChild(style);
			} else {
				console.log('CSS error');
			}
		}
	}
	request.send();
};
// JS 动态加载
getJS.onclick = () => {
	const request = new XMLHttpRequest();
	request.open('GET', '/child1.js');
	request.onreadystatechange = () => {
		if(request.readyState === 4) {
			if(request.status === 200) {
				console.log(request.response);
				const js = document.createElement('script');
				js.innerHTML = request.response;
				document.body.appendChild(js);
			} else {
				console.log('JS error');
			}
		}
	}
	request.send();
};
// HTML 动态加载
getHTML.onclick = () => {
	const request = new XMLHttpRequest()
	request.open('GET', '/ch1.html');
	request.onreadystatechange = () => {
		if(request.readyState === 4) {
			if(request.status === 200) {
				console.log(request.response);
				const div = document.createElement('div');
				div.innerHTML = request.response;
				document.body.appendChild(div);
			} else {
				console.log('HTML error');
			}
		}
	}
	request.send();
};
// XML加载
getXML.onclick = () => {
	const request = new XMLHttpRequest();
	request.open("GET", "/hello.xml");
	request.onreadystatechange = () => {
	  if (request.readyState === 4) {
			if(request.status === 200) {
				console.log(request.response);
				const dom = request.responseXML;
				const text = dom.getElementsByTagName("warning")[0].textContent;
				alert(text.trim());
			} else {
				console.log('XML error');
			}
		}
	}
	request.send();
  };
// JSON加载
getJSON.onclick = () => {
	const request = new XMLHttpRequest();
	request.open("GET", "/data.json");
	request.onreadystatechange = () => {
	  if (request.readyState === 4) {
			if(request.status === 200) {
				console.log(typeof request.response);
				let obj;
				try{
					obj = JSON.parse(request.response);
				} catch(error) {
					console.log('出错了');
					console.log(error);
					obj = false;
				}
				console.log(typeof obj);
				console.log(obj);
			} else {
				console.log('JSON error');
			}
		}
	}
	request.send();
  };
  // JSON加载
getPage.onclick = () => {
	const request = new XMLHttpRequest();
	if(page <= 3) {
		request.open("GET", `/page${page}`);
		request.onreadystatechange = () => {
			if (request.readyState === 4) {
				if(request.status === 200) {
					console.log(typeof request.response);
					let array;
					try{
						array = JSON.parse(request.response);
					} catch(error) {
						console.log('出错了');
						console.log(error);
						array = [];
					}
					array.forEach((item) => {
						const li = document.createElement('li');
						li.innerText = item.list;
						pages.appendChild(li);
					});
					page++;
				} else {
					console.log(`Page${page} error`);
				}
			}
		}
		request.send();
	} else {
		console.log('No more pages');
	}
  };