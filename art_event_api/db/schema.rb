ActiveRecord::Schema.define(version: 2019_06_04_202512) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "days", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "days_venues", id: false, force: :cascade do |t|
    t.bigint "day_id", null: false
    t.bigint "venue_id", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "images", default: [], array: true
    t.string "price"
    t.datetime "start_date"
    t.datetime "end_date"
    t.boolean "permanent"
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "venue_id"
    t.index ["venue_id"], name: "index_events_on_venue_id"
  end

  create_table "events_media", id: false, force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "medium_id", null: false
  end

  create_table "media", force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "venues", force: :cascade do |t|
    t.string "name"
    t.string "category"
    t.string "address"
    t.string "area"
    t.string "opening_time"
    t.string "closing_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "events", "venues"
end
