import { Authors } from "../pages/authors/authors";
import { AuthorsDetailPage } from "../pages/authors/authors-detail";
import { CreateAuthors } from "../pages/authors/create-authors";
import { EditAuthors } from "../pages/authors/update-authors";
import { BookDetail } from "../pages/books/book-detail";
import { Books } from "../pages/books/Books";
import { Categories } from "../pages/categories/categories";
import { CategoryDetailPage } from "../pages/categories/category-detail";
import { CreateCategory } from "../pages/categories/create-category";
import { EditCategory } from "../pages/categories/update-category";
import { Cities } from "../pages/cities/cities";
import { CitiesDetail } from "../pages/cities/cities-detail";
import { CreateCities } from "../pages/cities/create-cities";
import { EditCities } from "../pages/cities/update-cities";
import { CreateDistrict } from "../pages/districts/create-district";
import { UpdateDistrict } from "../pages/districts/update-district";
import { CreateLanguages } from "../pages/languages/create-languages";
import { Languages } from "../pages/languages/languages";
import { EditLanguages } from "../pages/languages/update-languages";
import { ChangePassword } from "../pages/profile/edit-password";
import { Profile } from "../pages/profile/profile";
import { ProfileEditPage } from "../pages/profile/update-profile";
import { Publishers } from "../pages/publishers/publishers";
import { PublisherDetail } from "../pages/publishers/publishers-detail";
import { AdminChange } from "../pages/super-admin/admin-change";
import { AdminCreate } from "../pages/super-admin/admin-create";
import { AllUsers } from "../pages/super-admin/all-users";
import { AdminDetailPage } from "../pages/super-admin/users-detail-page";
import { CreateTranslator } from "../pages/translator/create-translator";
import { Translator } from "../pages/translator/translator";
import { TranslatorUpdate } from "../pages/translator/translator-update";
import { Vacancies } from "../pages/vacancies/vacancies";
import { VacanciesDetail } from "../pages/vacancies/vacancies-detail";

export const adminRoutes = [
  { path: "profile", component: <Profile /> },
  { path: "update-profile", component: <ProfileEditPage /> },
  { path: "update-password", component: <ChangePassword /> },
  { path: "categories", component: <Categories /> },
  { path: "create-categories", component: <CreateCategory /> },
  { path: "categories-update/:id", component: <EditCategory /> },
  { path: "categories-detail/:id", component: <CategoryDetailPage /> },
  { path: "authors", component: <Authors /> },
  { path: "create-authors", component: <CreateAuthors /> },
  { path: "authors-update/:id", component: <EditAuthors /> },
  { path: "authors-detail/:id", component: <AuthorsDetailPage /> },
  { path: "cities", component: <Cities /> },
  { path: "create-cities", component: <CreateCities /> },
  { path: "cities-update/:id", component: <EditCities /> },
  { path: "cities-detail/:id", component: <CitiesDetail /> },
  { path: "create-district/:id", component: <CreateDistrict /> },
  { path: "update-district/:id", component: <UpdateDistrict /> },
  { path: "languages", component: <Languages /> },
  { path: "create-languages", component: <CreateLanguages /> },
  { path: "languages-update/:id", component: <EditLanguages /> },
  { path: "publishers", component: <Publishers /> },
  { path: "publishers-detail/:id", component: <PublisherDetail /> },
  { path: "books", component: <Books /> },
  { path: "books-detail/:id", component: <BookDetail /> },
  { path: "vacancies", component: <Vacancies /> },
  { path: "vacancies-detail/:id", component: <VacanciesDetail /> },
  { path: "translator", component: <Translator /> },
  { path: "create-translator", component: <CreateTranslator /> },
  { path: "translator-update/:id", component: <TranslatorUpdate /> },
];

export const superAdminRoutes = [
  { path: "admin-create", component: <AdminCreate /> },
  { path: "admin-change", component: <AdminChange /> },
  { path: "all-users", component: <AllUsers /> },
  { path: "detail-page/:id", component: <AdminDetailPage /> },
];
