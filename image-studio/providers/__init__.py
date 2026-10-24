"""Image providers. Each module only makes the API call; studio.py does the rest.

A provider module defines:
  NAME, LABEL, MODEL, FRAMED (whether Levi's tarot frame goes on top), SETTINGS (for the log)
  prompt_block(year)        the block between the scene and the style guide, for the card's year
  table_estimate()          price per image before the log has real costs
  make_client(key)
  call(client, prompt)  ->  (PIL image, usage dict or None, cost or None)
It raises Refused for content refusals (never retried), Rejected for other bad requests
(not retried) and anything else for errors worth a retry.
"""


class Refused(Exception):
    def __init__(self, message, details=None):
        super().__init__(message)
        self.details = details


class Rejected(Exception):
    pass


from . import openai_provider, nanobanana  # noqa: E402

PROVIDERS = {"openai": openai_provider, "nanobanana": nanobanana}
