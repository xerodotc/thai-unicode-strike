/*
	Thai Unicode strikethrough generator function
*/

function strikethrough(text)
{
	var floating_vowels = new Array('ู', 'ุ', 'ึ', 'ํ', 'ั', 'ี', '๊', '้', '็', '่', '๋', 'ฺ', 'ิ', '์', 'ื', 'ำ');
	var no_strikethrough = new Array('\n');
	var break_vowels_from = new Array('ำ');
	var break_vowels_to = new Array(new Array('ํ', 'า'));

	var stext = "";
	var break_i;
	
	for (i = 0; i < text.length; i++)
	{
		if (no_strikethrough.indexOf(text[i]) >= 0)
		{
			stext += text[i];
			continue;
		}
		
		if (i < (text.length-1))
		{
			if (break_vowels_from.indexOf(text[i]) >= 0)
			{
				break_i = break_vowels_from.indexOf(text[i]);
				stext += break_vowels_to[break_i][0] + '\u0336' + break_vowels_to[break_i][1];
			}
			else if (break_vowels_from.indexOf(text[i+1]) >= 0)
			{
				break_i = break_vowels_from.indexOf(text[i+1]);
				if (floating_vowels.indexOf(text[i]) >= 0)
				{
					stext += break_vowels_to[break_i][0] + text[i] + '\u0336' + break_vowels_to[break_i][1];
				}
				else
				{
					stext += text[i] + break_vowels_to[break_i][0] + '\u0336' + break_vowels_to[break_i][1];
				}
				
				i++;
			}
			else
			{
				stext += text[i];
			}
		
			// Lookahead
			if (i < (text.length-1))
			{
				if (floating_vowels.indexOf(text[i+1]) < 0)
				{
					stext += '\u0336';
				}
			}
			else
			{
				stext += '\u0336';
			}
		}
		else
		{
			if (break_vowels_from.indexOf(text[i]) >= 0)
			{
				break_i = break_vowels_from.indexOf(text[i]);
				stext += break_vowels_to[break_i][0] + '\u0336' + break_vowels_to[break_i][1];
			}
			else
			{
				stext += text[i];
			}
			
			stext += '\u0336';
		}
	}
	
	return stext;
}
