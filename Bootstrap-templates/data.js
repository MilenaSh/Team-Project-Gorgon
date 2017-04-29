window.onload = function () {
    var hotels = [{
        image:"images/samle-hotel.jpg",
        name:"Hotel name",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos error maiores, deserunt rerum doloraut sequi assumenda id, alias placeat quo totam in tempora animi. Expedita voluptate reprehenderit,totam eaque"
    }, {
        image:"images/samle-hotel.jpg",
        name:"Hotel name",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos error maiores, deserunt rerum doloraut sequi assumenda id, alias placeat quo totam in tempora animi. Expedita voluptate reprehenderit,totam eaque"
    }, {
        image:"images/samle-hotel.jpg",
        name:"Hotel name",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos error maiores, deserunt rerum doloraut sequi assumenda id, alias placeat quo totam in tempora animi. Expedita voluptate reprehenderit,totam eaque"
    }, {
        image:"images/samle-hotel.jpg",
        name:"Hotel name",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos error maiores, deserunt rerum doloraut sequi assumenda id, alias placeat quo totam in tempora animi. Expedita voluptate reprehenderit,totam eaque"
    },{
        image:"images/samle-hotel.jpg",
        name:"Hotel name",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos error maiores, deserunt rerum doloraut sequi assumenda id, alias placeat quo totam in tempora animi. Expedita voluptate reprehenderit,totam eaque"
    },{
        image:"images/samle-hotel.jpg",
        name:"Hotel name",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos error maiores, deserunt rerum doloraut sequi assumenda id, alias placeat quo totam in tempora animi. Expedita voluptate reprehenderit,totam eaque"
    },{
        image:"images/samle-hotel.jpg",
        name:"Hotel name",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos error maiores, deserunt rerum doloraut sequi assumenda id, alias placeat quo totam in tempora animi. Expedita voluptate reprehenderit,totam eaque"
    },{
        image:"images/samle-hotel.jpg",
        name:"Hotel name",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos error maiores, deserunt rerum doloraut sequi assumenda id, alias placeat quo totam in tempora animi. Expedita voluptate reprehenderit,totam eaque"
    },{
        image:"images/samle-hotel.jpg",
        name:"Hotel name",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos error maiores, deserunt rerum doloraut sequi assumenda id, alias placeat quo totam in tempora animi. Expedita voluptate reprehenderit,totam eaque"
    }];

    const templateString = document.getElementById('data-template').innerHTML;
    const template = Handlebars.compile(templateString);
    const html = template({hotels: hotels});
    document.getElementById('hotels-data').innerHTML = html;
};