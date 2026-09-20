# P1 Coverage Gaps

This audit checks whether common product requests can be composed from the current public components. It records gaps only; it does not expand P1.

| Requested interface | Current composition | Result |
| --- | --- | --- |
| Signed-in account settings | `Sidebar`, `Breadcrumb`, `ProfileCard`, `FormField`, form controls, `Toggle`, `ButtonGroup` | Covered |
| Personal profile | `ProfileCard`, `FormField`, `Avatar`, actions | Covered |
| Pet profile | `ProfileCard`, `Timeline`, `ActionCard`, tags | Covered |
| Task-management home | `Navbar`/`Sidebar`, `StatCard`, `ActionCard`, `Table`, `Pagination` | Covered for a conventional home screen |
| User activity history | `Timeline` or `Table` with `Pagination` | Covered |
| File-management tool | `Breadcrumb`, `ActionCard`, `Table`, `Drawer`, `AlertDialog` | Covered for browse/details/delete; advanced file-grid selection remains application logic |
| SaaS dashboard | `Navbar`, `Sidebar`, `StatCard`, `Table`, `Timeline`, `Pagination` | Covered |
| Learning record | Existing learning components plus `Table`/`Timeline` | Covered |
| Filter side panel | `Drawer` plus existing form controls | Covered |
| Delete-account flow | `AlertDialog` plus loading state | Covered |

## Deferred gaps

- Calendar/date selection remains a gap for date-heavy scheduling products. `DatePicker` and `Calendar` are explicitly outside P1.
- Rich file managers still need application-owned multi-selection, drag/drop organization, previews, and bulk-operation state. P1 intentionally supplies the stable building blocks rather than a file-manager product component.
- Tables intentionally omit sorting, filtering, row selection, column resizing, editing, virtualization, and server orchestration. Compose `Search`, form controls, `Table`, and `Pagination` as needed.
- Navigation routes and active-route resolution remain application/router responsibilities.
- Authentication, uploads, persistence, data fetching, and authorization remain outside the UI package.
- A generic page-level alert/banner is not included because `Alert` and `Banner` were explicitly excluded from P1.

The three-case internal acceptance view is available from the documentation app with `?p1-acceptance` and demonstrates the design system working as one composition without introducing product templates.
