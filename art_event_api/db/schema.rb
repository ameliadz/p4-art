# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_05_224033) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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

  create_table "venue_owners", force: :cascade do |t|
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
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
    t.bigint "venue_owner_id"
    t.string "days", default: [], array: true
    t.index ["venue_owner_id"], name: "index_venues_on_venue_owner_id"
  end

  add_foreign_key "events", "venues"
  add_foreign_key "venues", "venue_owners"
end
