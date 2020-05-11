function deleteActivity(id, onSuccess, onFailure) {
    Function.validate(onSuccess)

    Function.validate(onFailure)

    String.validate(id)

    Trello.delete(`cards/${id}`, onSuccess, onFailure);
}