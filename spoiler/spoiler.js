'use strict'
/**
	* Simple spoiler
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @class
	* @classdesc this class will create spoiler.
	* @param {String} className - class of div wich containe spoiler child elements.
	* @param {String} status - start status of spoiler, it can be 'opened' or 'closed'.
	* @param {int} velocity - velocite of slide in px per second
	* @param {String} title - class of spoiler button
	* @param {String} content - class of spoiler content div
	*/

	var Spoiler = function(className, status, velocity, title, content){
		
		// spoiler parametrs initialization
		// standart parametrs for all elements with same className
		this.spoilerName = className;
		if(title != undefined)
		{
			this.spoilerTitle = title;
		}
		else
		{
			this.spoilerTitle = 'title';
		}

		if(content != undefined)
		{
			this.spoilerContentName = content;
		}
		else
		{
			this.spoilerContentName = 'content';
		}
		if(velocity != undefined)
		{
			this.velocity = velocity;
		}
		else
		{
			this.velocity = 10;
		}

		// Unique parametres for every spoiler element on page with same className
		// variable arrays innitialization, for every element
		this.spoiler = new Array();
		this.title = new Array();
		this.content = new Array();
		this.contentHeight = new Array();
		this.helper = new Array();
		this.contentBody = new Array();
		this.spoilerStatus = new Array();

		// start of Unique innitialization
		for (var i = 0; i < document.getElementsByClassName(this.spoilerName).length; i++) 
		{
			this.spoiler[i] = document.getElementsByClassName(this.spoilerName)[i];

			if(status != undefined)
			{
				this.spoilerStatus[i] = status;
			}
			else
			{
				this.spoilerStatus[i] = 'closed';
			}

			// manipulation with title 
			if(this.title[i] = this.spoiler[i].getElementsByClassName(this.spoilerTitle)[0])
			{
				this.title[i].style.cursor = 'pointer';
				if(this.spoilerStatus[i] == 'opened')
				{
					this.title[i].className = this.spoilerTitle+' opened';
				}
				else if(this.spoilerStatus[i] == "closed")
				{
					this.title[i].className = this.spoilerTitle+' closed';
				}
			}
			else
			{
				console.log('errore! title is not set');
			}

			// manipulation with content
			if(this.content[i] = this.spoiler[i].getElementsByClassName(this.spoilerContentName)[0]){

				// adding helping element for correcting hight wich will be get
				this.helper = this.content[i].innerHTML;
				this.content[i].innerHTML = '';
				this.contentBody[i] = document.createElement('div');
				this.contentBody[i].innerHTML = this.helper;
				this.contentBody[i].style.position = 'relative';
				this.contentBody[i].style.overflow = 'hidden';
				this.content[i].appendChild(this.contentBody[i]);

				// getting of hight
				this.contentHeight[i] = this.content[i].clientHeight;

				if(this.spoilerStatus[i] == 'opened')
				{
					this.content[i].style.height = this.contentHeight[i]+'px';
				}
				else if(this.spoilerStatus[i] == "closed")
				{
					this.content[i].style.height = '0px';
				}
				this.content[i].style.overflow = 'hidden';
			}
			else
			{
				console.log('errore! content is not set');
			}

			// innitialization of on click function for title
			this.title[i].object = this;
			this.title[i].index = i;
			this.title[i].onclick = function()
			{
				if(spoilerStatusCheck(this.object, this.index) == 'closed')
				{
					slide(this.object.content[this.index],
								'down', 
								this.object.contentHeight[this.index], 
								this.index, 
								this.object, 
								this.object.velocity);
					this.className = this.object.spoilerTitle + ' opened';
				}
				else if(spoilerStatusCheck(this.object, this.index) == 'opened')
				{
					slide(this.object.content[this.index],
								'up', 
								this.object.contentHeight[this.index], 
								this.index, 
								this.object, 
								this.object.velocity);
					this.className = this.object.spoilerTitle + ' closed';
				}
			}
		};

	/**
		* @function
		* @name spoilerStatusCheck
		* @param {Spoiler} object - object that contain all initialized parametrs
		* @param {int} index - it is index of spoiler element with current className 
		*	@return {String} - status of current spoiler 
		*/
		function spoilerStatusCheck(object, index)
		{
			return object.spoilerStatus[index];
		}

	/**
		* @method
		* @name spoilerStatusCheck
		* @param {int} index - it is index of spoiler element with current className 
		*	@return {String} - status of current spoiler 
		* @return {Array} - statuses of all spoilers with current className
		*/
		this.getStatus = function(index){
			if (index != undefined) 
			{
				return this.spoilerStatus[index];
			}
			else
			{
				return this.spoilerStatus;
			}
		}

	/**
		* @method
		* @name toggle
		* @param {int} index - it is index of spoiler element with current className 
		*/
		this.toggle = function(index){
			if(index != undefined)
			{
				if(spoilerStatusCheck(this, index) == 'closed')
				{
					slide(this.content[index],'down', this.contentHeight[index], index, this, this.velocity);
					this.title[index].className = this.spoilerTitle+' opened';
				}
				else if(spoilerStatusCheck(this, index) == 'opened')
				{
					slide(this.content[index],'up', this.contentHeight[index], index, this, this.velocity);
					this.title[index].className = this.spoilerTitle+' closed';
				}
			}
			else
			{
				for (var i = 0; i < this.spoiler.length; i++) {
					if(spoilerStatusCheck(this, i) == 'closed')
					{
						slide(this.content[i],'down', this.contentHeight[i], i, this, this.velocity);
						this.title[i].className = this.spoilerTitle+' opened';
					}
					else if(spoilerStatusCheck(this, i) == 'opened')
					{
						slide(this.content[i],'up', this.contentHeight[i], i, this, this.velocity);
						this.title[i].className = this.spoilerTitle+' closed';
					}
				};
			}
		}

	/**
		* @function
		* @name spoilerStatusChange
		* @param {Spoiler} object - object that contain all initialized parametrs
		* @param {int} index - it is index of spoiler element with current className 
		*/
		function spoilerStatusChange(object, index)
		{
			if (object.spoilerStatus[index] == 'opened') 
			{
				object.spoilerStatus[index] = 'closed';
			} 
			else
			{
				object.spoilerStatus[index] = 'opened';
			};
		}

	/**
		* @function
		* @name slide
		* @param {Object} content - object wich containe spoiler content
		* @param {String} diraction - diraction of movement accordin slider condition
		* @param {int} originalHeight - height of content in opened condition 
		* @param {int} index - it is index of spoiler element with current className 
		* @param {Spoiler} object - object that contain all initialized parametrs
		*/
		function slide(content, diraction, originalHeight, index, object, velocity)
		{
			// animation loop
			var interval = setInterval(function(content, diraction)
			{

				// iteration for open action
				if(diraction == 'up')
				{
					var height = content.clientHeight;
					var finale_height = height - velocity;

					if(finale_height < 0)
					{
						finale_height = 0
					}
					content.style.height = finale_height + 'px';

					if(height <= 0)
					{
						content.style.height = '0px';
 						spoilerStatusChange(object,index);
 						clearInterval(interval);
					}
				}

				// iteration for close action 
				else if(diraction == 'down')
				{
					var height = content.clientHeight;
					content.style.height = height + velocity + 'px';
					if(height >= originalHeight)
					{
						content.style.height = originalHeight + 'px';
						spoilerStatusChange(object,index);
 						clearInterval(interval);
					}
				}
			}, 1, content, diraction)
		}
	}

	// create object wich will contrill spoilers with className 'spoiler'
	var spoiler = new Spoiler('spoiler','opened', 1);

	// Animation example for spoilers:
	/*
		setInterval(function(){
			spoiler.toggle();
		},5000)
		setInterval(function(){
			spoiler2.toggle();
		},5000)
	*/

	// Animation example for unique intervale benith actions:
	/*
		setInterval(function(){
			spoiler.toggle(0);
		},5000)
		setInterval(function(){
			spoiler.toggle(1);
		},6000)
		setInterval(function(){
			spoiler2.toggle();
		},7000)
	*/

	// create object wich will contrill spoilers with className 'spoiler1'
	var spoiler2 = new Spoiler('spoiler1','closed', 10, 'title2','content3');