//Add A Value 
async function addValue() {
    let head = {
        id: 0,
        Next: null,
        value: "Start pasting text here to get started"
    }
    // chrome.storage.sync.set({ head }, function () { });
    //Check if head is already set and set it
    const checkHead =
        new Promise(resolve => {
            chrome.storage.sync.get(['head'], function (result) {
                if (result == null) {
                    chrome.storage.sync.set({ head }, function () {
                    });
                }
                resolve(result);
            }
            );
        })
    await checkHead;

    //Create a new node  
    var node = createNode();
    //Add node to the list
    addNodeAsync(node);
}

//Create A New Node
function createNode() {
    text = getBarText();//Get the text from the bar
    let node = {
        Next: null,
        value: text
    }
    return node;
}

//Get Value From Bar
function getBarText() {
    return document.getElementById("addBar").value;
}

//Add a value to the list
async function addNodeAsync(node) {
    var head;
    //get the head
    const checkHead =
        new Promise(resolve => {
            chrome.storage.sync.get(['head'], function (result) {
                head = result.head;
                resolve(result);
            }
            );
        })
    await checkHead;
    
    //Set the id of the node
    var id = head.id + 1;
    node.id = id;

    //set the new node as the head
    node.Next = head;
    head = node;

    //Set the new head
    chrome.storage.sync.set({ head }, function () {
    });
}

//
function createHTMLNode(text, id){
    var p = document.createElement("p");
    var node = document.createTextNode(text);
    p.setAttribute("id", id);
    p.appendChild(node);
    var element = document.getElementById("list");
    element.appendChild(p);
}
