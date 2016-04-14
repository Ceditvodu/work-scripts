"use strict";
/**
* main class of wall
* 
* 
* 
*/

function Wall()
{
	
	/**
	  * That is construct function, that according enabled parametrs:
	  * if we dont have a sub container it must to do all work without it  
	  *
	  * @param name: string id of container
	  * 
	  */

	this.init = function(name)
	{
		// main parametr 
		this.name = name;

		// container initializing 
		this.wallCont = document.getElementById(this.name);

		// image arrays 
		this.chArray = new Array();
		this.orderArray = new Array();
		var orderArray = new Array();

		// creting arrays of images 
		this.ch = this.wallCont.getElementsByTagName('img');
		this.chCount = this.wallCont.getElementsByTagName('img').length;
		var chCount = this.chCount;
			
		for(var i= 0; i<this.chCount; i++)
		{
			this.chArray.push(this.ch[i]);
		}

		// creating numered array
		for( var i = 0 ; i < this.chArray.length ; i++ )
		{
			if((this.chArray[i].clientHeight > this.chArray[i].clientWidth)
				||(this.chArray[i].clientHeight == this.chArray[i].clientWidth))
			{
				this.orderArray[i] = new Array();
				this.orderArray[i][0] = this.chArray[i];
				this.orderArray[i][1] = 1;
			}
			else
			{
				this.orderArray[i] = new Array();
				this.orderArray[i][0] = this.chArray[i];
				this.orderArray[i][1] = 2;
			}
		}

		orderArray = this.orderArray;

		// creating a wall
		this.refresh();
		
		// functional for resizing
		window.addEventListener('resize', function ()
			{
				if(orderArray[0][1] == 1){
					height = orderArray[0][0].parentNode.clientWidth + "px";
				}
				else if(orderArray[0][1] == 2)
				{
					height = orderArray[0][0].parentNode.clientWidth/2 + "px";
				}
				else{}

				for (var i = 0; i < chCount; i++) 
				{
					if (orderArray[i][1] == 1) 
					{
						orderArray[i][0].parentNode.style.height = height;
					}
					else if(orderArray[i][1] == 2)
					{
						orderArray[i][0].parentNode.style.height = height;
					} 
					else{}
				}
			}
		);
	}

	/**
	  * This function refreshing a wall 
	  *
	  */

	this.refresh = function()
	{
		this.counter = 0;
		this.number = 0;
		this.imgCache ;

		// array correction if the order of elements is wrong
		for (var i = 0; i < this.chArray.length; i++) 
		{

			if (this.orderArray[i][1] == '1')
			{
				this.counter = this.counter + 1;
			}
			else if(this.orderArray[i][1] == '2')
			{
				this.counter = this.counter + 2;
			} 

			if(this.counter > 4)
			{
				// changing placece one to one 
				this.imgCache = this.chArray[i];
				this.chArray[i] = this.chArray[i+1]
				this.chArray[i+1] = this.imgCache;

				//chenging order number 
				this.number = this.orderArray[i][1];
				this.orderArray[i][1] = this.orderArray[i+1][1];
				this.orderArray[i+1][1] = this.number;
				this.counter = 0;
			}
			else if(this.counter == 4)
			{
				this.counter = 0;
			}
		}

		// naming classes according image width
		for (var i = 0; i < this.chArray.length; i++) 
		{
			if (this.orderArray[i][1] == 1) 
			{
				this.chArray[i].parentNode.className = 'one-col-img';
				this.chArray[i].parentNode.style.height = this.chArray[i].parentNode.clientWidth + "px";
			}
			else if(this.orderArray[i][1] == 2)
			{
				this.chArray[i].parentNode.className = 'two-col-img';
				this.chArray[i].parentNode.style.height = this.chArray[i].parentNode.clientWidth/2 + "px";
			} 
			else{}
		}

		// clearing container
		this.wallCont.innerHTML = '';

		// reading changed elements back
		for (var i = 0; i < this.chArray.length; i++) 
		{
			 this.wallCont.appendChild(this.chArray[i].parentNode);
		}
	}
}