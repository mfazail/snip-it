## Schema

#### Profile

- id (INT)
- user_id (UUID)
- name (TEXT)
- username (TEXT|UNIQUE)
- avatar_url (TEXT)
- created_at (DATE)
- updated_at (DATE)

#### Snip

- id (INT)
- profile_id (INT|FORIEGN KEY)
- prefix (TEXT|REQUIRED)
- body (TEXT)
- description (TEXT)
- lang (TEXT)
- library (TEXT)
- created_at (DATE)
- updated_at (DATE)
