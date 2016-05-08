'use strict'
	// Creating new child class for tabed fetures
/**
	* @name Accordion
	* @version 1.0.0
	* @author Ivan Kaduk
	* @copyright Ivan Kaduk 2016.
	* @class
	* @augments Spoiler
	* @classdesc 
	* @example var tab = new Accordion('spoiler6','opened',1);
	* @param {String} className - class of div wich containe accordion child elements.
	* @param {String} status - start status of accordion, it can be 'opened' or 'closed'.
	* @param {int} velocity - velocite of slide in px per second
	* @param {String} title - class of accordion button
	* @param {String} content - class of accordion content div
	*/
	var Accordion = (function(){
		// constructor
		function Accordion(className, status, velocity, content, title, alternative_title)
		{
			// applying all from parent class
			Spoiler.apply(this, arguments);

		/**
			* @public
			*/
			this.prevElement = 0;

			// elements loop
			for (var i = 0; i < document.getElementsByClassName(this.spoilerName).length; i++) 
			{
				this.spoiler[i] = document.getElementsByClassName(this.spoilerName)[i];

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
				if(this.title[i] = this.spoiler[i].getElementsByClassName(this.spoilerTitle)[0])
				{
					// set pointer cursor for title
					this.title[i].style.cursor = 'pointer';

					if((this.spoilerStatus[i] == 'opened')&&(i == 0))
					{
						this.title[i].className = this.spoilerTitle+' opened';
					}
					else if((this.spoilerStatus[i] == 'opened')&&(i > 0))
					{
						this.title[i].className = this.spoilerTitle+' closed';
						this.spoilerStatus[i] == 'closed';
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

					if((this.spoilerStatus[i] == 'opened')&&(i == 0))
					{
						this.content[i].style.height = this.contentHeight[i]+'px';
					}
					else if((this.spoilerStatus[i] == 'opened')&&(i > 0))
					{
						this.content[i].style.height = '0px';
						this.spoilerStatus[i] = 'closed';
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
						if(Spoiler.prototype.spoilerStatusCheck(this.object, this.index) == 'closed')
						{
							Spoiler.prototype.slide(this.object.content[this.index],
										'down', 
										this.object.contentHeight[this.index], 
										this.index, 
										this.object, 
										this.object.velocity);
							this.className = this.object.spoilerTitle + ' opened';

							// closing previos element if it opened
							if(Spoiler.prototype.spoilerStatusCheck(this.object, this.object.prevElement) == 'opened')
							{
								Spoiler.prototype.slide(this.object.content[this.object.prevElement],
										'up', 
										this.object.contentHeight[this.object.prevElement], 
										this.object.prevElement, 
										this.object, 
										this.object.velocity);
								this.className = this.object.spoilerTitle + ' closed';
							}
							this.object.prevElement = this.index;
						}
						else if(Spoiler.prototype.spoilerStatusCheck(this.object, this.index) == 'opened')
						{
							Spoiler.prototype.slide(this.object.content[this.index],
										'up', 
										this.object.contentHeight[this.index], 
										this.index, 
										this.object, 
										this.object.velocity);
							this.className = this.object.spoilerTitle + ' closed';
						}
					}
				}
			}
		}

	//returning object
	return Accordion;

	// prototype parent class
	Accordion.prototype.spoiler = Object.create(Spoiler.prototype);

	// applying constructor
	Accordion.prototype.constructor = Accordion;
})();

