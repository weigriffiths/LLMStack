# Generated by Django 4.2.11 on 2024-07-10 18:18

from django.db import migrations


def populate_type_slug(apps, schema_editor):
    DataSource = apps.get_model("datasources", "DataSource")
    for datasource in DataSource.objects.all():
        type_slug = datasource.type.slug
        datasource_config = datasource.config or {}
        datasource_config["type_slug"] = type_slug
        datasource.config = {**datasource_config}
        datasource.save()


class Migration(migrations.Migration):

    dependencies = [
        ("datasources", "0004_alter_datasource_uuid_alter_datasourceentry_uuid_and_more"),
    ]

    operations = [migrations.RunPython(populate_type_slug, reverse_code=migrations.RunPython.noop)]