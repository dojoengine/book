# NOTE: TRANSLATE .po FILE TO ANOTHER LANGUAGE USING GPT-3
# 1. Set OPENAI_API_KEY environment variable to your API key.
# 2. Set the source_file, target_language, and output_file variables. 
# 3. Run the script.

# NOTE: If you are making a totally new version, delete the old lang file first.
# NOTE: If the script fails, just start it again and it will pick up where it left off.

import polib
from openai import OpenAI
import time
import os

openai_api_key = os.environ.get('OPENAI_API_KEY')

# source_file is the path to your .pot file
source_file = './messages.pot'

# target_language is the language you want to translate to
target_language = 'chinese'

# output_file is the path to the translated .po file.
output_file = './cn.po' 

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

def process_po_file(source_file_path, target_language, output_file_path):
    # Load the .po file
    if os.path.exists(output_file_path):
        print(f"Using existing translated file: {output_file_path}")
        po = polib.pofile(output_file_path)
    else:
        print(f"Starting with source file: {source_file_path}")
        po = polib.pofile(source_file_path)

    # Iterate through all entries in the .po file
    for index, entry in enumerate(po):
        print(f"Processing entry {index + 1}/{len(po)}")

        # Skip entry if translation already exists
        if entry.msgstr.strip() != "":
            print(f"Skipping entry {index + 1}, translation already exists.")
            continue

        print("Original Text (msgid):", entry.msgid)

        success = False
        retries = 3  # Number of retries
        while retries > 0 and not success:
            try:
                # Construct the message for translation
                translation_request = f"""
                You are a professional book/novel translator and you will be given a language and a body of text in english. Your job is to translate the text into into {target_language}.

                You are only allowed to return the translated text and nothing else. 

                IMPORTANT: ONLY RETURN TRANSLATED TEXT AND NOTHING ELSE.

                 message to translate: {entry.msgid}
                 """

                # Simulating a translation API call
                chat_completion = client.chat.completions.create(
                    messages=[{"role": "user", "content": translation_request}],
                    model="gpt-3.5-turbo-1106",
                )

                # Extracting the translated text
                translated_text = chat_completion.choices[0].message.content.strip()
                entry.msgstr = translated_text

                print("Translated Text (msgstr):", translated_text)
                success = True  # Translation successful

            except Exception as e:
                retries -= 1
                print(f"Error processing entry {index + 1}: {e}")
                print(f"Retrying... {retries} attempts left.")
                time.sleep(2)  # Delay before retrying

        if not success:
            print(f"Failed to translate entry {index + 1} after multiple attempts.")

        # Save the .po file after each entry
        po.save(output_file_path)
        print("Progress saved.")

        # Half-second delay between requests
        time.sleep(0.2)

        print("-----------")

# Path to your .po file
process_po_file(source_file, target_language, output_file)
