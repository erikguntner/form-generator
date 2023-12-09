from marshmallow import Schema, fields


class ApplicationSchema(Schema):
    id = fields.Int(
        dump_only=True,
    )
    name = fields.Str(required=True)
    created_at = fields.DateTime(
        dump_only=True,
    )
    updated_at = fields.DateTime()


application_schema = ApplicationSchema()
applications_schema = ApplicationSchema(many=True)
