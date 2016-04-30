'use strict'
/**
	* @name Simple spoiler
	* @version 2.0.0
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @class
	* @classdesc this class will create spoiler.
	* @example // var spoiler = new Spoiler('spoiler','opened', 1);
	* @param {String} className - class of div wich containe spoiler child elements.
	* @param {String} status - start status of spoiler, it can be 'opened' or 'closed'.
	* @param {int} velocity - velocite of slide in px per second
	* @param {String} title - class of spoiler button
	* @param {String} content - class of spoiler content div
	*/

	var Spoiler = function(className, status, velocity, title, content){
		
		// spoiler parametrs initialization
		// standart parametrs for all elements with same className
	/**
		* @public
		*/
		this.spoilerName = className;
		if(title != undefined)
		{
	/**
		* @public
		*/
			this.spoilerTitle = title;
		}
		else
		{
		/**
			* @default
			* @public
			*/
			this.spoilerTitle = 'title';
		}

		if(content != undefined)
		{
		/**
			* @public
			*/
			this.spoilerContentName = content;
		}
		else
		{
		/**
			* @default
			* @public
			*/
			this.spoilerContentName = 'content';
		}
		if(velocity != undefined)
		{
		/**
			* @public
			*/
			this.velocity = velocity;
		}
		else
		{
		/**
			* @default
			* @public
			*/
			this.velocity = 10;
		}

		// Unique parametres for every spoiler element on page with same className
		// variable arrays innitialization, for every element
	/**
		* @public
		*/
		this.spoiler = new Array();
	/**
		* @public
		*/
		this.title = new Array();
	/**
		* @public
		*/
		this.content = new Array();
	/**
		* @public
		*/
		this.contentHeight = new Array();
	/**
		* @public
		*/
		this.helper = new Array();
	/**
		* @public
		*/
		this.contentBody = new Array();
	/**
		* @public
		*/
		this.spoilerStatus = new Array();
	/**
		* @public
		*/
		this.clickable = new Array();

		// start of Unique innitialization
		for (var i = 0; i < document.getElementsByClassName(this.spoilerName).length; i++) 
		{
			this.spoiler[i] = document.getElementsByClassName(this.spoilerName)[i];

			// set that spoiler is ready for clicking
		/**
			* @default
			*/
			this.clickable[i] = 'true';

			if(status != undefined)
			{
				this.spoilerStatus[i] = status;
			}
			else
			{
			/**
				* @default
				*/
				this.spoilerStatus[i] = 'closed';
			}

			// manipulation with title 
			if(this.title[i] = this.spoiler[i].getElementsByClassName(this.spoilerTitle)[0])
			{
				// set pointer cursor for title
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

				// getting of hight
				this.content[i].style.float = 'left';
				this.contentHeight[i] = this.content[i].clientHeight;
				this.content[i].style.float = null;

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

		/**
			* @event title#onclick
			*/
			this.title[i].onclick = function()
			{
				if(this.object.clickable)
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
			}
		};

	/**
		* @private
		* @function
		* @name spoilerStatusCheck
		* @description returning status of spoiler (opened, closed)
		* @example // spoilerStatusCheck(this, i);
		* @param {Spoiler} object - object that contain all initialized parametrs
		* @param {int} index - it is index of spoiler element with current className 
		* @return {String} - status of current spoiler 
		*/
		function spoilerStatusCheck(object, index)
		{
			return object.spoilerStatus[index];
		}

	/**
		* @public
		* @method
		* @name spoilerStatusCheck
		* @description returning status of spoiler (opened, closed)
		* @example // spoiler.getStatus(0);
		* @param {int} index - it is index of spoiler element with current className 
		* @return {String} - status of current spoiler 
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
		* @public
		* @method
		* @name toggle
		* @description toggle spoiler element
		* @example //spoiler.toggle();
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
		* @private
		* @function
		* @name spoilerStatusChange
		* @description change spoiler status according it previous status
		* @example // spoilerStatusChange(this, i);
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
		* @private
		* @function
		* @name slide
		* @description closing/opening functional of slider
		* @example // slide(this.object.content[this.index], 'down', this.object.contentHeight[this.index], this.index, this.object, this.object.velocity);
		* @param {Object} content - object wich containe spoiler content
		* @param {String} diraction - diraction of movement accordin slider condition
		* @param {int} originalHeight - height of content in opened condition 
		* @param {int} index - it is index of spoiler element with current className 
		* @param {Spoiler} object - object that contain all initialized parametrs
		*/
		function slide(content, diraction, originalHeight, index, object, velocity)
		{
			// animation loop
		/**
			* @privat
			*/
			var interval = setInterval(function(content, diraction)
			{

				// iteration for open action
				if(diraction == 'up')
				{
				/**
					* @privat
					*/
					var height = content.clientHeight;
				/**
					* @privat
					*/
					var finale_height = height - velocity;

					if(finale_height < 0)
					{
						finale_height = 0
						clickable(object, index, false);
					}
					content.style.height = finale_height + 'px';

					if(height <= 0)
					{
						content.style.height = '0px';
						clickable(object, index, true);
 						spoilerStatusChange(object,index);
 						clearInterval(interval);
					}
				}

				// iteration for close action 
				else if(diraction == 'down')
				{
				/**
					* @privat
					*/
					var height = content.clientHeight;
					clickable(object, index, false);
					content.style.height = height + velocity + 'px';
					if(height >= originalHeight)
					{
						content.style.height = originalHeight + 'px';
						clickable(object, index, true);
						spoilerStatusChange(object,index);
 						clearInterval(interval);
					}
				}
			}, 1, content, diraction)
		}

	/**
		* @private
		* @function
		* @name clickable
		* @description seting clickable condition for current spoiler
		* @example // clicable(this, index, true);
		* @param {Spoiler} object - object that contain all initialized parametrs
		* @param {int} index - it is index of spoiler element with current className 
		* @param {boolean} condition - clicable condition of spoiler title
		*/
		function clickable(object, index, condition)
		{
			if(condition == true)
			{
				object.clickable[index] = true;
			}
			else if (condition == false)
			{
				object.clickable[index] = false;
			}
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