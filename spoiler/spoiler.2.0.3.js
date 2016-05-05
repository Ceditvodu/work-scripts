'use strict'
/**
	* @name Spoiler
	* @version 2.0.2
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @class
	* @classdesc this class will create spoiler.
	* @example var spoiler = new Spoiler('spoiler','opened', 1);
	* @param {String} className - class of div wich containe spoiler child elements.
	* @param {String} status - start status of spoiler, it can be 'opened' or 'closed'.
	* @param {int} velocity - velocite of slide in px per second
	* @param {String} title - class of spoiler button
	* @param {String} content - class of spoiler content div
	*/

	var Spoiler = (function(){
		// constructor
		function Spoiler(className, status, velocity, content, title, alternative_title){
		// spoiler parametrs initialization
		// standart parametrs for all elements with same className
		/**
			* @privat
			*/
			var spoilerName = className;
			if(title != undefined)
			{
				var spoilerTitle = title;
			}
			else
			{
			/**
				* @default
				* @privat
				*/
				var spoilerTitle = 'title';
			}

			if(title != undefined)
			{
				var secondTitle = alternative_title;
			}

			if(content != undefined)
			{
				var spoilerContentName = content;
			}
			else
			{
			/**
				* @default
				* @privat
				*/
				var spoilerContentName = 'content';
			}
			if(velocity != undefined)
			{
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
			* @privat
			*/
			var spoiler = new Array();
		/**
			* @privat
			*/
			var title = new Array();
		/**
			* @privat
			*/
			var secondtitle = new Array();
		/**
			* @privat
			*/
			var content = new Array();
		/**
			* @privat
			*/
			var contentHeight = new Array();
		/**
			* @privat
			*/
			var titleText = new Array();
		/**
			* @public
			*/
			this.spoilerStatus = new Array();
		/**
			* @public
			*/
			this.clickable = new Array();

			// start of Unique innitialization
			for (var i = 0; i < document.getElementsByClassName(spoilerName).length; i++) 
			{
				spoiler[i] = document.getElementsByClassName(spoilerName)[i];

				// set that spoiler is ready for clicking
				this.clickable[i] = 'true';

				if(status != undefined)
				{
					this.spoilerStatus[i] = status;
				}
				else
				{
					this.spoilerStatus[i] = 'closed';
				}

				// manipulation with title 
				if(title[i] = spoiler[i].getElementsByClassName(spoilerTitle)[0])
				{
					// set pointer cursor for title
					title[i].style.cursor = 'pointer';

					if(this.spoilerStatus[i] == 'opened')
					{
						title[i].className = spoilerTitle+' opened';
					}
					else if(this.spoilerStatus[i] == "closed")
					{
						title[i].className = spoilerTitle+' closed';
					}
				}
				else
				{
					console.log('errore! title is not set');
				}

				if(secondtitle[i] = spoiler[i].getElementsByClassName(secondTitle)[0])
				{
					secondtitle[i].style.display = 'none';
				}
				else
				{
					secondtitle[i] = false;
				}

				// manipulation with content
				if(content[i] = spoiler[i].getElementsByClassName(spoilerContentName)[0]){

					// getting of hight
					content[i].style.float = 'left';
					contentHeight[i] = content[i].clientHeight;
					content[i].style.float = null;

					if(this.spoilerStatus[i] == 'opened')
					{
						content[i].style.height = contentHeight[i]+'px';
					}
					else if(this.spoilerStatus[i] == "closed")
					{
						content[i].style.height = '0px';
					}
					content[i].style.overflow = 'hidden';
				}
				else
				{
					console.log('errore! content is not set');
				}

				// innitialization of on click function for title
				title[i].object = this;
				title[i].index = i;

			/**
				* @event title#onclick
				*/
				title[i].onclick = function()
				{
					if(this.object.clickable)
					{
						if(spoilerStatusCheck(this.object, this.index) == 'closed')
						{
							slide(content[this.index],
										'down', 
										contentHeight[this.index], 
										this.index, 
										this.object, 
										this.object.velocity);
							this.className = spoilerTitle + ' opened';
							
							secondtitletoggle(this.index);
						}
						else if(spoilerStatusCheck(this.object, this.index) == 'opened')
						{
							slide(content[this.index],
										'up', 
										contentHeight[this.index], 
										this.index, 
										this.object, 
										this.object.velocity);
							this.className = spoilerTitle + ' closed';

							secondtitletoggle(this.index);
						}
					}
				}
			};
		/**
			* @public
			* @method
			* @name toggle
			* @description toggle spoiler element
			* @example spoiler.toggle();
			* @param {int} index - it is index of spoiler element with current className 
			*/
			this.toggle = function(index)
			{
				if(index != undefined)
				{
					if(spoilerStatusCheck(this, index) == 'closed')
					{
						slide(content[index],'down', contentHeight[index], index, this, this.velocity);
						title[index].className = spoilerTitle+' opened';
					}
					else if(spoilerStatusCheck(this, index) == 'opened')
					{
						slide(content[index],'up', contentHeight[index], index, this, this.velocity);
						title[index].className = spoilerTitle+' closed';
					}
				}
				else
				{
					for (var i = 0; i < this.spoiler.length; i++) {
						if(spoilerStatusCheck(this, i) == 'closed')
						{
							slide(content[i],'down', contentHeight[i], i, this, this.velocity);
							title[i].className = spoilerTitle+' opened';
						}
						else if(spoilerStatusCheck(this, i) == 'opened')
						{
							slide(content[i],'up', contentHeight[i], i, this, this.velocity);
							title[i].className = spoilerTitle+' closed';
						}
					};
				}
			}

		/**
			* @public
			* @method
			* @name getStatus
			* @description returning status of spoiler (opened, closed)
			* @example spoiler.getStatus(0);
			* @param {int} index - it is index of spoiler element with current className 
			* @return {String} - status of current spoiler 
			* @return {Array} - statuses of all spoilers with current className
			*/
			this.getStatus = function(index)
			{
				if (index != undefined) 
				{
					return this.spoilerStatus[index];
				}
				else
				{
					return this.spoilerStatus;
				}
			}
		}

	/**
		* @private
		* @function
		* @name spoilerStatusCheck
		* @description returning status of spoiler (opened, closed)
		* @example spoilerStatusCheck(this, i);
		* @param {Spoiler} object - object that contain all initialized parametrs
		* @param {int} index - it is index of spoiler element with current className 
		* @return {String} - status of current spoiler 
		*/
		function spoilerStatusCheck(object, index)
		{
			return object.spoilerStatus[index];
		}
		Spoiler.prototype.spoilerStatusCheck = function(object, index){
			return spoilerStatusCheck.call(this, object, index);
		}



	/**
		* @private
		* @function
		* @name spoilerStatusChange
		* @description change spoiler status according it previous status
		* @example spoilerStatusChange(this, i);
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
		* @example slide(this.object.content[this.index], 'down', this.object.contentHeight[this.index], this.index, this.object, this.object.velocity);
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
		* @example clicable(this, index, true);
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

	/**
		* @private
		* @function
		* @name secondtitletoggle
		* @description toggling of title text
		* @example secondtitletoggle(index);
		* @param {int} index - it is index of spoiler element with current className 
		*/
		function secondtitletoggle(index)
		{
			if(secondtitle[index] != false){
				titleText[index] = secondtitle[index].innerHTML;
				secondtitle[index].innerHTML = title[index].innerHTML;
				title[index].innerHTML = titleText[index];
			}
			else
			{
				console.log('error! secondtitle is not set');	
			}
		}

		//returning object
		return Spoiler;
	})();

	// Creating new child class for tabed fetures
/**
	* @name Accordion_Spoiler
	* @class
	* @augments Spoiler
	* @classdesc 
	* @example var tab = new Accordion_Spoiler('spoiler6','opened',1);
	* @param {String} className - class of div wich containe spoiler child elements.
	* @param {String} status - start status of spoiler, it can be 'opened' or 'closed'.
	* @param {int} velocity - velocite of slide in px per second
	* @param {String} title - class of spoiler button
	* @param {String} content - class of spoiler content div
	*/
	var Accordion_Spoiler = function(className, status, velocity, content, title, alternative_title){
		// applying all from parent class
		Spoiler.apply(this, arguments);
		console.log(Spoiler.prototype.spoilerStatusCheck(this, 0));
		//f();
	}

	// prototype parent class
	Accordion_Spoiler.prototype = Object.create(Spoiler.prototype);

	// applying constructor
	Accordion_Spoiler.prototype.constructor = Accordion_Spoiler;

	