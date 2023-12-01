# TRANSLATE .po FILE TO ANOTHER LANGUAGE USING GPT-3
# 1. Set OPENAI_API_KEY environment variable to your API key: export OPENAI_API_KEY=<your key>
# 2. Set the source_file, target_language, and output_file variables.
# 3. Run the script.

import polib
from openai import OpenAI
import time
import os

openai_api_key = os.environ.get('OPENAI_API_KEY')

# source_file is the path to your .pot file
source_file = './po/messages.pot'

# target_language is the language you want to translate to
target_language = 'latin'

# output_file is the path to the translated .po file.
output_file = './po/JP.po' 

if openai_api_key is None:
    print("""
          Set OPENAI_API_KEY environment variable to your API key. 
            -------
          export OPENAI_API_KEY=<your key>
            -------
          You can find your key at https://platform.openai.com/api-keys
          """)
else:
    print("OPENAI_API_KEY is set.")

client = OpenAI()

def process_po_file(file_path, target_language, output_file_path):
    # Load the .po file
    po = polib.pofile(file_path)

    # Iterate through all entries in the .po file
    for entry in po:
        print("Original Text (msgid):", entry.msgid)

        # Construct the message for translation
        translation_request = f"translate this to {target_language} do not include english characters if it is asian lang: " + entry.msgid

        # Simulating a translation API call
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": translation_request}],
            model="gpt-3.5-turbo",
        )
        
        # Assuming the translation is in the 'choices' field of the response
        translated_text = chat_completion.choices[0].message.content.strip()
        entry.msgstr = translated_text

        print("Translated Text (msgstr):", translated_text)
        print("-----------")

        # Half-second delay between requests
        time.sleep(0.5)

    # Save the translated entries to a new .po file
    po.save(output_file_path)

# Path to your .po file
process_po_file(source_file, target_language, output_file)
