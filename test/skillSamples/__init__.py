# This program is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free Software
# Foundation, either version 3 of the License, or (at your option) any later
# version.
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
# details.
#
# You should have received a copy of the GNU General Public License along with
# this program. If not, see <http://www.gnu.org/licenses/>.
#
from mycroft import MycroftSkill, intent_file_handler, intent_handler, AdaptIntent
import requests
import time


API_KEY = "2432"
API_URL = "https://www.thecocktaildb.com/api/json/v1/{}/".format(API_KEY)
SEARCH = API_URL + "search.php"


def search_cocktail(name):
    """Search the Cocktails DB for a drink."""
    r = requests.get(SEARCH, params={"s": name})
    if 200 <= r.status_code < 300 and "drinks" in r.json() and r.json()["drinks"]:
        return r.json()["drinks"][0]
    else:
        return None


def ingredients(drink):
    """Get ingredients from drink data from the cocktails DB."""
    ingredients = []
    for i in range(1, 15):
        ingredient_key = "strIngredient" + str(i)
        measure_key = "strMeasure" + str(i)
        if not drink[ingredient_key]:
            break
        if drink[measure_key] is not None:
            ingredients.append(" ".join((drink[measure_key], drink[ingredient_key])))
        else:  # If there is no measurement for the ingredient ignore it
            ingredients.append(drink[ingredient_key])

    return nice_ingredients(ingredients)


def nice_ingredients(ingredients):
    """Make ingredient list easier to pronounce."""
    units = {
        "oz": "ounce",
        "1 tbl": "1 table spoon",
        "tbl": "table spoons",
        "1 tsp": "tea spoon",
        "tsp": "tea spoons",
        "ml ": "milliliter ",
        "cl ": "centiliter ",
    }
    ret = []
    for i in ingredients:
        for word, replacement in units.items():
            i = i.lower().replace(word, replacement)
        ret.append(i)
    return ret


class CocktailSkill(MycroftSkill):
    @intent_file_handler("Recipie.intent")
    def get_recipie(self, message):
        cocktail = search_cocktail(message.data["drink"])
        if cocktail:
            self.speak_dialog(
                "YouWillNeed",
                {"ingredients": ", ".join(ingredients(cocktail)[:-1]), "final_ingredient": ingredients(cocktail)[-1]},
            )
            time.sleep(1)
            self.speak(cocktail["strInstructions"])
            self.set_context("IngredientContext", str(ingredients(cocktail)))
        else:
            self.speak_dialog("NotFound")

    def repeat_ingredients(self, ingredients):
        self.speak(ingredients)

    @intent_file_handler("Needed.intent")
    def get_ingredients(self, message):
        cocktail = search_cocktail(message.data["drink"])
        if cocktail:
            self.speak_dialog(
                "YouWillNeed",
                {"ingredients": ", ".join(ingredients(cocktail)[:-1]), "final_ingredient": ingredients(cocktail)[-1]},
            )
            self.set_context("IngredientContext", str(ingredients(cocktail)))
        else:
            self.speak_dialog("NotFound")

    @intent_handler(AdaptIntent().require("Ingredients").require("What").require("IngredientContext"))
    def what_were_ingredients(self, message):
        """Context aware handler if the user asks for a repeat."""
        return self.repeat_ingredients(message.data["IngredientContext"])

    @intent_handler(
        AdaptIntent().require("Ingredients").require("TellMe").require("Again").require("IngredientContext")
    )
    def tell_ingredients_again(self, message):
        return self.repeat_ingredients(message.data["IngredientContext"])


def create_skill():
    return CocktailSkill()
