from marshmallow import Schema, fields


class ApplicationSchema(Schema):
    id = fields.Int(dump_only=True, required=True)
    name = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True, required=True)
    updated_at = fields.DateTime(required=True)


application_schema = ApplicationSchema()
applications_schema = ApplicationSchema(many=True)
