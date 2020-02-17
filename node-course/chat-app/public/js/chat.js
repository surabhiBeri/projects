const socket=io();

//Elements
const $chatForm=document.querySelector('#chat-form');
const $chatFormInput=document.querySelector('input');
const $chatFormButton=document.querySelector('button');
const $sendLocationButton=document.querySelector('#send-location');
const $messages=document.querySelector('#messages');
const $sidebar=document.querySelector('#sidebar');

//Templates
const messageTemplate=document.querySelector('#message-template').innerHTML;
const locationTemplate=document.querySelector('#location-template').innerHTML;
const sidebarTemplate=document.querySelector('#sidebar-template').innerHTML;

//Options
const user=Qs.parse(location.search,{ignoreQueryPrefix:true})

const autoscroll=()=>{
    
    // new message element
    const $newMessage=$messages.lastElementChild

    //height of the new message
    const newMessageStyles=getComputedStyle($newMessage)
    const newMessageMargin=parseInt(newMessageStyles.marginBottom)
    const newMessageHeight=$newMessage.offsetHeight + newMessageMargin

    //visible height
    const visibleHeight=$messages.offsetHeight

    //height of messages container
    const containerHeight=$messages.scrollHeight

    //how far have i scrolled?
    const scrollOffset=$messages.scrollTop + visibleHeight

    if((containerHeight - newMessageHeight)<= scrollOffset){
        $messages.scrollTop=$messages.scrollHeight
    }



}

socket.on('message',(data)=>{
    console.log(data);
    const html=Mustache.render(messageTemplate,{
        username:data.username,
        message:data.text,
        createdAt:moment(data.createdAt).format('h:mm a')
    });

    $messages.insertAdjacentHTML('beforeend',html);
    autoscroll()
})

$chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    $chatFormButton.setAttribute('disabled','disabled');
    const messageFromUser=e.target.elements.message.value;
    socket.emit('messageSentFromUser',messageFromUser,(message)=>{
        $chatFormButton.removeAttribute('disabled');
        $chatFormInput.value='';
        $chatFormInput.focus();
        console.log(message);
    });
})

$sendLocationButton.addEventListener('click',(e)=>{
    e.preventDefault();
    if(!navigator.geolocation){
        return alert('Geoloaction is not supported in your  browser!');
    }
    $sendLocationButton.setAttribute('disabled','disabled');
    navigator.geolocation.getCurrentPosition((position)=>{
        const location={
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        }
        socket.emit('sendLocation',location,(message)=>{
            $sendLocationButton.removeAttribute('disabled');
            console.log(message);
        });
    });
})

socket.on('locationInfo',(data)=>{
    console.log(data)
    const html=Mustache.render(locationTemplate,{
        username:data.username,
        url:data.url,
        createdAt:moment(data.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.emit('join',user,(error)=>{
    if(error){
        alert(error)
        location.href='/'
    }
});

socket.on('roomData',({room,users})=>{
    const html=Mustache.render(sidebarTemplate,{
        room,
        users
    })
    $sidebar.innerHTML=html;
})