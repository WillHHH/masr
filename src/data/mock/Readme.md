# Mock Data

Mock data for all data sources is stored here. Data is comprised on named Javascript objects and is organized by type in subfolders. Each folder exports all of its members. Default structure is as follows:

- cms
  - common: Data that is common across all projects, such as Strapi's media library items
  - custom: Schemas that we create in the cms, such as an Article content type in Strapi
- custom: Any other datasources such as 3rd party APIs

## Methodology

As a general rule, a mock should be created for every data Interface in web/types/. This means that every auto generated type from Strapi _must_ have a mock. Any other external API data sources _must_ also have a mock. By maintaining a 1:1 relationship with our typed interfaces, mocks are predictable and easy to reference.

A good way strategy for creating mocks is by using the high level generated Strapi types as a guide and map them to the data the API returns. For example, say we have an "Articles" endpoint.

- Open web/types/article.ts.
- Open https://CMS_DOMAIN/articles/1.
- Copy and paste the rendered article JSON data into a new JS object named mockIArticle.
- Replace the values of keys that refer to other types with an imported object of that mocked type data.

## Naming

All exported members should following a standard naming convention that follows the Typescript interface it implements. If a mock object implements the `IFile` interface, then its exported `const` should be `mockIFile`.

```
export const mockIFile: IFile = {
  ...
}
```

_Be aware and avoid naming collisions. All exports must have a unique name._

## Usage

All exported members from anywhere in the folder structure can be imported with a single import:

```
import { mockIFile, mockITeamMember } from "data/mock";
```
